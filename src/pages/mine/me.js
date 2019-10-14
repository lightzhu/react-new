import React from 'react'
// import axios from 'axios'
// import { Input, Form, Button, Icon, message } from 'antd'
import '../../style/mine.scss'
class Me extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: ''
    }
  }
  // gotoRegister() {
  //   history.push('/register')
  // }
  render() {
    return <div>我的详情页</div>
  }
  componentDidUpdate(prevProps, prevState) {
    //debugger
    // if (prevProps.checkLogin) {
    //   if (!window.sessionStorage.logined) {
    //     this.props.toLogin()
    //   }
    //   console.log(prevProps, prevState)
    // }
  }
  componentDidMount() {
    console.log(this.props.checkLogin)
    if (this.props.checkLogin) {
      if (!window.sessionStorage.logined) {
        this.props.toLogin()
      }
    }
    // if (!window.sessionStorage.logined) {
    //   this.props.toLogin()
    // }
  }
}

export default Me
