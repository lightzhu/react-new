import React from 'react'
import { InputItem, Button } from 'antd-mobile'
import axios from 'axios'
import '../../style/tool.scss'
let timer = null
class QingFlow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      phone: '',
      captcha: '',
      resMsg: '',
      time: 61,
      canget: true
    }
    this.getInitData = this.props.getInitData
  }
  componentDidMount() {
    // this.getInitData(this.state.type)
    this.autoFocusInst.focus();
  }

  numberBlur(val) {
    console.log(val)
    if (val) {
      this.setState({ phone: val })
    }
  }
  codeBlur(val) {
    if (val) {
      this.setState({ captcha: val })
    }
  }
  computeTime() {
    timer = setInterval(() => {
      console.log(0)
      let number = this.state.time
      if (number-- === 0) {
        timer = null
        this.setState({
          time: 61,
          canget: true
        })
        return false
      }
      this.setState({
        time: number
      })
    }, 1000)
  }
  getCaptcha() {
    axios.get('https://service-k6tmuqqv-1253862250.sh.apigw.tencentcs.com/release/getCaptcha', {
      params: {
        pn: this.state.phone.replace(/\s/g, '')
      }
    })
      .then((response) => {
        let res = response.data
        this.setState({
          canget: false
        })
        this.computeTime()
        if (res.RespCode === '10001') {
          this.setState({ resMsg: res.RespMsg })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  flowExchange() {
    axios.get('https://service-3moqdsmd-1253862250.sh.apigw.tencentcs.com/release/flowExchange', {
      params: {
        pn: this.state.phone.replace(/\s/g, ''),
        captcha: this.state.captcha
      }
    })
      .then(function (response) {
        console.log(response);
        let res = response.data
        if (res.code === 200) {
          let data = JSON.parse(res.body)
          this.setState({ resMsg: data.respDesc })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  componentWillUnmount() {
    clearInterval(timer)
  }
  render() {
    const { canget, time } = this.state
    return (
      <div className="qing">
        <img alt="青岛啤酒兑流量" src={`${require('@/static/image/qingpi.jpg')}`}></img>
        <div>
          <p>1.先输入手机号点击获取验证码，手机收到验证码后输入到页面再点击兑换流量;</p>
          <p>2.联通用户每次可以兑换30M全国流量，每月限领10次;</p>
          <p>3.每天限获取3次验证码，兑换流量有效期3个月，可在联通营业厅查询;</p>
          <p>4.活动最终解释权归青岛啤酒，本页面只做兑换入口，不获取任何用户信息。</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <InputItem
            clear
            type="phone"
            placeholder="请输入联通手机号"
            ref={el => this.autoFocusInst = el}
            onBlur={this.numberBlur.bind(this)}
          >手机号</InputItem>
          <InputItem
            clear
            type="number"
            placeholder="请输入短信验证码"
            onBlur={this.codeBlur.bind(this)}
          >验证码</InputItem>
          <div className="line-center">
            <Button type="primary" disabled={!canget} className="btns" inline onClick={this.getCaptcha.bind(this)}>
              {canget ? '获取验证码' : `${time}秒后可获取`}
            </Button>
            <Button type="primary" className="btns" inline onClick={this.flowExchange.bind(this)}>兑换流量</Button>
          </div>

        </div>

        <div className="resMsg">
          {this.state.resMsg}
        </div>
      </div>
    )
  }
}
export default QingFlow
