import React from 'react'
import './App.css'
import { TabBar, Toast } from 'antd-mobile'
import Home from './pages/home/home'
import Mine from './pages/mine/index'
import Echo from './pages/echo/index'
import News from './pages/news/news'
import { connect } from 'react-redux'
import { getNewsInfo } from './actions/Index'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: '',
      loggedIn: false,
      tabHidden: false,
      selectedTab: 'mov',
      checkLogin: false
    }
  }

  handleTabPress(selectTab) {
    this.setState({
      selectedTab: selectTab
    })
    // history.push('/')
    window.location.hash = '/'
    if (selectTab === 'mine') {
      this.setState({
        checkLogin: true
      })
    } else {
      // debugger
      this.setState({
        checkLogin: false
      })
    }
    if (selectTab === 'hot') {
      const { getNewsInfo } = this.props
      getNewsInfo('top')
      Toast.loading("Loading...", 20000)
    }
  }
  render() {
    return (
      <div className="App">
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
              onPress={this.handleTabPress.bind(this, 'mov')}
              data-seed="logId"
            >
              <Home selected={this.state.selectedTab === 'mov'} />
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
              onPress={this.handleTabPress.bind(this, 'hot')}
              data-seed="logId1"
            >
              <News selected={this.state.selectedTab === 'hot'} />
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
              key="echo"
              badge={1}
              selected={this.state.selectedTab === 'echo'}
              onPress={this.handleTabPress.bind(this, 'echo')}
            >
              <Echo selected={this.state.selectedTab === 'echo'} />
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
              onPress={this.handleTabPress.bind(this, 'mine')}
            >
              {/* checkLogin={this.state.checkLogin} */}
              <Mine selected={this.state.selectedTab === 'mine'} />
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.news
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getNewsInfo: msg => {
      dispatch(getNewsInfo(msg))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
