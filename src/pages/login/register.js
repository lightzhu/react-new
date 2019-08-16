import React from 'react'
import axios from 'axios'
import Input from 'antd/es/input' // 加载 JS
import Form from 'antd/es/form'
import Button from 'antd/es/button'
import Icon from 'antd/es/icon'
import md5 from 'blueimp-md5'
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: '',
      hobby: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const params = {
      userName: this.state.userName,
      pwd: md5(this.state.pwd),
      hobby: this.state.hobby
    }
    axios
      .post(`${this.props.host}/register`, params)
      .then(function(response) {
        // handle success
        console.log(response)
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
  handleHobbyInput(e) {
    this.setState({
      hobby: e.target.value
    })
  }
  render() {
    return (
      <div className="reg">
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
          <Form.Item>
            <Input
              prefix={
                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="喜欢的电影类型"
              value={this.state.hobby}
              onChange={this.handleHobbyInput.bind(this)}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form>
      </div>
    )
  }
}

export default Register
