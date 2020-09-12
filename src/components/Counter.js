import React, { Component } from 'react'
import store from '../reducers/store'
import { increment, decrement } from '../actions/counter'
import { connect } from 'react-redux'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0
    }
  }
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => { })
  }
  componentWillUnmount() {
    this.unsubscribe() //取消订阅
  }
  render() {
    return (
      <div style={{ border: '1px solid red' }}>
        <p>{this.props.counter}</p>
        <button onClick={this.props.increment}> + </button>
        <button onClick={this.props.decrement}> - </button>
      </div>
    )
  }
  componentDidMount() {
    // console.log(this.props)
  }
}

const mapStateToProps = state => {
  return { counter: state.counter }
}

const mapDispatchToProps = dispatch => {
  // return {
  //   increment: dispatch({ type: 'INCREMENT' })
  // }
}

export default connect(mapStateToProps)(Counter)
