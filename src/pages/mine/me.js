import React from 'react'
import { Button, Grid, List, WhiteSpace } from 'antd-mobile'
import '../../style/mine.scss'
import { createHashHistory } from 'history'
import user from '../../static/icon/user.png'
const history = createHashHistory()
const Item = List.Item
const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));
class Me extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: ''
    }
  }
  loginOut() {
    window.sessionStorage.removeItem('logined')
    window.sessionStorage.removeItem('userId')
    history.push('/login')
  }
  render() {
    return (<div>
      <header className="head">
        <img src={user} alt=""></img>
        <p className="nick">我是二傻子</p>
      </header>
      <Grid data={data1}
        columnNum={3}
        renderItem={dataItem => (
          <div style={{ padding: '12.5px' }}>
            <img src={dataItem.icon} style={{ width: '50px', height: '50px' }} alt="" />
            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
              <span>友情链接</span>
            </div>
          </div>
        )}
      />
      <WhiteSpace />
      <Item arrow="horizontal" multipleLine onClick={() => { }}>
        修改信息
        </Item>
      <Item arrow="horizontal" multipleLine onClick={() => { }}>
        我的发布
        </Item>
      <WhiteSpace />

      <Button onClick={this.loginOut}>退出登陆</Button>
    </div>)
  }
  componentDidUpdate(prevProps, prevState) {
  }
  componentDidMount() {
    // console.log(this.props.checkLogin)
    // if (this.props.checkLogin) {

    // }
    // if (window.sessionStorage.getItem('logined') !== 'true') {
    //   this.props.toLogin()
    // }
  }
}

export default Me
