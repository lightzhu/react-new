import React from 'react'
import { Input, Form, Button, Icon, message } from 'antd'
import fetch from '@/static/js/request'
import { Toast } from 'antd-mobile'
import md5 from 'blueimp-md5'
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
    const params = {
      userName: this.state.userName,
      pwd: md5(this.state.pwd)
    }
    // let that = this
    Toast.loading('Loading...')
    fetch('/login', 'post', params)
      .then(function (response) {
        // handle success
        console.log(response)
        if (response.statue === 0) {
          message.loading(response.msg, 0.1)
          window.sessionStorage.setItem('logined', 'true')
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
  handleUserInput(e) {
    this.setState({
      userName: e.target.value
    })
  }
  handlePwdInput(e) {
    this.setState({
      pwd: e.target.value
    })
  }
  // gotoRegister() {
  //   history.push('/register')
  // }
  render() {
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={this.state.userName}
              size="large"
              onChange={this.handleUserInput.bind(this)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              size="large"
              placeholder="Password"
              value={this.state.pwd}
              onChange={this.handlePwdInput.bind(this)}
            />
          </Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={this.props.register}
            className="login-form-button"
          >
            创建账号
            <Icon type="arrow-right" className="animate" />
          </Button>
        </Form>
      </div>
    )
  }
  componentDidMount() {
    console.log(md5('e10adc3949ba59abbe56e057f20f883e'))
  }
}

export default Login
