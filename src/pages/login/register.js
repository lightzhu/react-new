import React from 'react'
import { Input, Form, Button, Icon, Radio } from 'antd'
import { Toast } from 'antd-mobile'
import md5 from 'blueimp-md5'
import '../../style/mine.scss'
import fetch from '@/static/js/request'
import { createHashHistory } from 'history'
const history = createHashHistory()
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
      password: this.state.pwd,
      pwd: md5(this.state.pwd),
      hobby: this.state.hobby
    }
    Toast.loading('Loading...')
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
          <div className="btn-box">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="login-form-button"
            >
              注册
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={this.props.goLogin}
              className="login-form-button"
            >
              已有账号
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default Register
