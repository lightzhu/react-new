import React from 'react'
// import axios from 'axios'
// import { Input, Form, Button, Icon, message } from 'antd'
import Me from './me'
import Login from '../login/login'
import Register from '../login/register'

// import md5 from 'blueimp-md5'
import { Router, Route, Redirect } from 'react-router-dom'
import { createHashHistory } from 'history'
import '../../style/mine.scss'
const history = createHashHistory()
class Mine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: ''
    }
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
  gotoRegister() {
    history.push('/register')
  }
  gotoLogin() {
    history.push('/login')
  }
  toLogin() {
    debugger
    history.replace('/login')
  }
  render() {
    return (
      <Router history={history}>
        <Route
          exact
          path="/"
          render={() => <Me router={history} toLogin={this.toLogin} />}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <Login register={this.gotoRegister.bind(this)} router={history} />
          )}
        />
        <Route
          exact
          path="/register"
          render={() => (
            <Register goLogin={this.gotoLogin.bind(this)} router={history} />
          )}
        />
      </Router>
    )
  }
  componentDidMount() {
    // console.log(this.props)
  }
}

export default Mine