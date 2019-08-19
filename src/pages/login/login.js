import React from 'react'
import axios from 'axios'
import { Input, Form, Button, Icon, message } from 'antd'
import md5 from 'blueimp-md5'
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
  render() {
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={this.state.userName}
              onChange={this.handleUserInput.bind(this)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={this.state.pwd}
              onChange={this.handlePwdInput.bind(this)}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
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
