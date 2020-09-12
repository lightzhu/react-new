import React from 'react'
import { Toast, Button, InputItem, Radio } from 'antd-mobile'
// import { createForm } from 'rc-form';
import md5 from 'blueimp-md5'
import '../../style/mine.scss'
import fetch from '@/static/js/request'
import { createHashHistory } from 'history'
import user from '../../static/icon/user.png'
import password from '../../static/icon/pwd.png'
import zone from '../../static/icon/zone.png'
import hobby from '../../static/icon/hobby.png'
// const RadioItem = Radio.RadioItem;
const history = createHashHistory()
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: '',
      hobby: '',
      gender: 'man',
      region: ''
    }
    this.data = [
      { value: 'man', label: '男' },
      { value: 'female', label: '女' },
    ];
  }
  handleSubmit(e) {
    e.preventDefault()
    const { userName, pwd, hobby } = this.state
    if (userName.trim() === '' || pwd.trim() === '') {
      Toast.info('用户名或密码不能为空！')
      return false
    }
    const params = {
      userName,
      hobby,
      password: pwd,
      pwd: md5(pwd)
    }
    Toast.loading('Loading...', 20000)
    fetch(`/register`, 'post', params)
      .then(function (response) {
        // handle success
        Toast.info(response.msg)
        history.push('/login')
      })
      .catch(function (error) {
        // handle error
        Toast.hide()
        console.log(error)
      })
  }
  handleUserInput(value) {
    this.setState({
      userName: value
    })
  }
  handlePwdInput(value) {
    this.setState({
      pwd: value
    })
  }
  handleRegionInput(value) {
    this.setState({
      region: value
    })
  }
  handleHobbyInput(value) {
    this.setState({
      hobby: value
    })
  }
  onGenderChange(value) {
    this.setState({
      gender: value
    })
  }
  goLogin() {
    this.props.history.push('/login')
  }
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div className="reg">
        <form className="login-form">
          <div className="form-item">
            <InputItem
              type="text"
              placeholder="昵称"
              error={this.state.hasError}
              onChange={this.handleUserInput.bind(this)}
              value={this.state.userName}
            ><img src={user} alt='' /></InputItem>
          </div>
          <div className="form-item">
            <InputItem
              type="password"
              placeholder="密码"
              error={this.state.hasError}
              onChange={this.handlePwdInput.bind(this)}
              value={this.state.pwd}
            ><img src={password} alt='' /></InputItem>
          </div>
          <div className="form-item">
            <InputItem
              type="text"
              placeholder="地区"
              value={this.state.region}
              onChange={this.handleRegionInput.bind(this)}
              error={this.state.hasError}
            ><img src={zone} alt='' /></InputItem>
          </div>
          <div className="form-item">
            <InputItem
              type="text"
              placeholder="兴趣爱好"
              error={this.state.hasError}
              onChange={this.handleHobbyInput.bind(this)}
              value={this.state.hobby}
            ><img src={hobby} alt='' /></InputItem>
          </div>
          <div className="form-sex">
            {this.data.map(i => (
              <Radio className="my-radio" key={i.value} checked={this.state.gender === i.value} onChange={() => this.onGenderChange(i.value)}>
                {i.label}
              </Radio>
            ))}
          </div>
          <div className="btn-box">
            <Button
              type="primary"
              size="large"
              onClick={this.handleSubmit.bind(this)}
              className="login-form-button"
            >
              注册
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={this.goLogin.bind(this)}
              className="login-form-button"
            >
              已有账号
            </Button>
          </div>
        </form>
      </div>
    )
  }
  componentDidMount() {
    console.log(this.props)
  }
}

export default Register
