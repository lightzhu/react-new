import React from 'react'
import axios from 'axios'
import { Input, Form, Button, Icon, message } from 'antd'
import Register from './register'

import md5 from 'blueimp-md5'
import { Router, Route, Redirect } from 'react-router-dom'
import { createHashHistory } from 'history'
import '../../style/mine.scss'
// const location = history.location
const history = createHashHistory()
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
    let that = this
    axios
      .post(`${this.props.host}/login`, params)
      .then(function(response) {
        // handle success
        console.log(response)
        let data = response.data
        if (data.statue === 0) {
          message.loading(data.msg, 0.1)
          that.props.router.push('/home')
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
      .finally(function() {
        // always executed
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
    // console.log(this.props)
  }
}

export default Login
