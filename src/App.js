import React from 'react'
import logo from './logo.svg'
import './App.css'

class App extends React.Component {
  handleClick(num) {
    let k = 9
    var nums = [1, 2, 3, 4, 5, 6, 7, 8]

    if (k > nums.length) {
      k = k % nums.length
    }
    let m = nums.splice(nums.length - k)
    nums = m.concat(nums)
    console.log(nums)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handleClick}>点我</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
