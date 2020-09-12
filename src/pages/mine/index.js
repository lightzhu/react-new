import React from 'react'
// import axios from 'axios'
import Me from './me'
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
    history.replace('/login')
  }
  render() {
    return (
      <Me
        checkLogin={this.props.checkLogin}
        router={history}
        toLogin={this.toLogin}
      />
    )
  }
  componentDidMount() {
    console.log(this.props)
  }
}

export default Mine
