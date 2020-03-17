import React from 'react'
import { Button } from 'antd-mobile';
import '../../style/mine.scss'
import { createHashHistory } from 'history'
const history = createHashHistory()
class Me extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: ''
    }
  }
  loginOut() {
    window.sessionStorage.removeItem('logined')
    history.push('/login')
  }
  render() {
    return (<div>
      我的详情页
      <Button onClick={this.loginOut}>退出登陆</Button>
    </div>)
  }
  componentDidUpdate(prevProps, prevState) {
  }
  componentDidMount() {
    // console.log(this.props.checkLogin)
    // if (this.props.checkLogin) {

    // }
    if (window.sessionStorage.getItem('logined') !== 'true') {
      this.props.toLogin()
    }
  }
}

export default Me
