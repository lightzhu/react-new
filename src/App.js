import React from 'react'
// import axios from 'axios'
import './App.css'
import { TabBar } from 'antd-mobile'
import Home from './pages/home/home'
import Mine from './pages/mine/index'
import Weather from './pages/weather/weather'
import News from './pages/news/news'

// import { Router, Route, Redirect } from 'react-router-dom'
// import { createHashHistory } from 'history'
// const location = history.location
// const unlisten = history.listen((location, action) => {
//   console.log(action, location.pathname, location.state)
// })
// const history = createBrowserHistory()
// const history = createHashHistory()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: '',
      loggedIn: false,
      // apiHost: 'https://imov.herokuapp.com',
      // apiHost: 'https://tf8app.gearhostpreview.com/',
      apiHost: '',
      tabHidden: false,
      selectedTab: 'mov'
    }
  }

  // getData() {
  //   axios
  //     .get('/get_movies')
  //     .then(function(response) {
  //       // handle success
  //       console.log(response)
  //     })
  //     .catch(function(error) {
  //       // handle error
  //       console.log(error)
  //     })
  //     .finally(function() {
  //       // always executed
  //     })
  // }
  handleClick() {
    // history.push('/home', { some: 'state' })
  }
  render() {
    const { apiHost } = this.state
    return (
      <div className="App">
        {/* <Router history={history}>
          <Route
            exact
            path="/"
            render={() =>
              loggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                <Home router={history} host={apiHost} />
              )
            }
          />
          <Route
            path="/login"
            exact
            render={() => <Login router={history} host={apiHost} />}
          />
          <Route
            path="/home"
            exact
            render={() => <Home router={history} host={apiHost} />}
          />
          <Route
            path="/register"
            exact
            render={() => <Register router={history} host={apiHost} />}
          />
          <Route
            path="/Weather"
            exact
            render={() => <Weather router={history} host={apiHost} />}
          />
          <Route
            path="/News"
            exact
            render={() => <News router={history} host={apiHost} />}
          />
        </Router> */}
        <div
          className="nav-bar"
          style={{
            height: '100%',
            width: '100vw',
            position: 'fixed',
            bottom: 0
          }}
        >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            hidden={this.state.tabHidden}
          >
            <TabBar.Item
              title="主页"
              key="mov"
              icon={{
                uri: `${require('./static/mov0.png')}`
              }}
              selectedIcon={{
                uri: `${require('./static/mov.png')}`
              }}
              selected={this.state.selectedTab === 'mov'}
              onPress={() => {
                this.setState({
                  selectedTab: 'mov'
                })
              }}
              data-seed="logId"
            >
              <Home host={apiHost} />
            </TabBar.Item>
            <TabBar.Item
              title="热点"
              key="hot"
              icon={{
                uri: `${require('./static/news0.png')}`
              }}
              selectedIcon={{
                uri: `${require('./static/news.png')}`
              }}
              selected={this.state.selectedTab === 'hot'}
              onPress={() => {
                this.setState({
                  selectedTab: 'hot'
                })
              }}
              data-seed="logId1"
            >
              <News host={apiHost} />
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require('./static/chongdong0.png')}) center center /  21px 21px no-repeat`
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require('./static/chongdong.png')}) center center /  21px 21px no-repeat`
                  }}
                />
              }
              title="虫洞"
              key="Friend"
              badge={1}
              selected={this.state.selectedTab === 'friend'}
              onPress={() => {
                this.setState({
                  selectedTab: 'friend'
                })
              }}
            >
              <Weather host={apiHost} />
            </TabBar.Item>
            <TabBar.Item
              icon={{
                uri:
                  'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'
              }}
              selectedIcon={{
                uri:
                  'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'
              }}
              title="我的"
              key="mine"
              selected={this.state.selectedTab === 'mine'}
              onPress={() => {
                this.setState({
                  selectedTab: 'mine'
                })
              }}
            >
              <Mine host={apiHost} />
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }
}

export default App
