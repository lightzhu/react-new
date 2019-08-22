import React from 'react'
import axios from 'axios'
import { Input, Form, Button, Icon, Radio } from 'antd'
// import Input from 'antd/es/input' // 加载 JS
import md5 from 'blueimp-md5'
import '../../style/mine.scss'
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: '',
      hobby: '',
      gender: '男',
      region: ''
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
  handleRegionInput(e) {
    this.setState({
      region: e.target.value
    })
  }
  handleHobbyInput(e) {
    this.setState({
      hobby: e.target.value
    })
  }
  onGenderChange(e) {
    debugger
    this.setState({
      gender: e.target.value
    })
  }
  render() {
    return (
      <div className="reg">
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="昵称"
              value={this.state.userName}
              onChange={this.handleUserInput.bind(this)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              value={this.state.pwd}
              onChange={this.handlePwdInput.bind(this)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={
                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="地区"
              value={this.state.region}
              onChange={this.handleRegionInput.bind(this)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={
                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="兴趣爱好"
              value={this.state.hobby}
              onChange={this.handleHobbyInput.bind(this)}
            />
          </Form.Item>
          <Form.Item>
            <Radio.Group
              onChange={this.onGenderChange.bind(this)}
              value={this.state.gender}
            >
              <Radio value="女">女的</Radio>
              <Radio value="男">男的</Radio>
            </Radio.Group>
          </Form.Item>

          <Button
            type="primary"
            size="large"
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
