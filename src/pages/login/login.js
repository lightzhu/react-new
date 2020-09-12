import React from 'react'
import fetch from '@/static/js/request'
import { Toast, Button, InputItem, Icon } from 'antd-mobile'
import md5 from 'blueimp-md5'
import user from '../../static/icon/user.png'
import password from '../../static/icon/pwd.png'
import '../../style/mine.scss'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const { userName, pwd } = this.state
    if (userName.trim() === '' || pwd.trim() === '') {
      Toast.info('用户名或密码不能为空！')
      return false
    }
    const params = {
      userName,
      pwd: md5(this.state.pwd)
    }
    // let that = this
    Toast.loading('Loading...', 20000)
    fetch('/login', 'post', params)
      .then(function (response) {
        // handle success
        console.log(response)
        if (response.statue === 0) {
          Toast.info(response.msg, 1);
          window.sessionStorage.setItem('logined', 'true')
          window.sessionStorage.setItem('userId', response.userId)
          window.sessionStorage.setItem('username', response.userName)
          window.location.hash = '/'
        } else {
          Toast.info(response.msg)
        }
      })
      .catch(function (error) {
        // handle error
        Toast.hide()
        console.log(error)
      })
  }
  handleUserInput(val) {
    this.setState({
      userName: val
    })
  }
  handlePwdInput(val) {
    this.setState({
      pwd: val
    })
  }
  gotoRegister() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div className="login reg">
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
          <Button
            size="large"
            type="primary"
            onClick={this.handleSubmit.bind(this)}
            className="login-form-button"
          >
            登陆
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={this.gotoRegister.bind(this)}
            className="login-form-button"
          >
            创建账号
            <Icon type="right" size="lg" className="animate" />
          </Button>
        </form>
      </div>
    )
  }
  componentDidMount() {
    console.log(md5('e10adc3949ba59abbe56e057f20f883e'))
  }
}

export default Login
