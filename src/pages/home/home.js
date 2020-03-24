import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import { getWeatherInfo } from '../../actions/Index'
import Weather from '../../components/Weather'
import ListView from '../../components/ListView'
import '../../style/home.scss'
import fetch from '@/static/js/request'
// import { thisTypeAnnotation } from '@babel/types'
axios.defaults.timeout = 60000 * 2
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{}],
      pageNum: 0,
      pageSize: 20,
      loading: true,
      hasMore: true,
      city: '宁波'
    }
  }
  movieLoad() {
    if (this.state.hasMore) {
      this.getMovieList()
    }
  }
  cityChange(city) {
    console.log(city)
    this.props.getWeatherInfo(city)
  }
  render() {
    const { data, hasMore, loading } = this.state
    return (
      <div
        className="home"
        style={{ height: 'calc(100vh - 50px)', overflow: 'auto' }}
      >
        <Weather
          cityChange={this.cityChange.bind(this)}
        />
        <ListView loadMore={this.movieLoad.bind(this)} data={data} isLoading={loading} hasMore={hasMore} />
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={this.movieLoad.bind(this)}
          hasMore={hasMore}
          initialLoad={false}
          threshold={60}
          useWindow={false}
          loader={<div className="loader" key={0} />}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                {this.renderBtn(item.type, item.btUrl)}
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className="avatar"
                      src={item.postUrl ? item.postUrl : logopic}
                    />
                  }
                  title={<a href="http://imov.herokuapp.com">{item.title}</a>}
                  description=btUrl
                />
              </List.Item>
            )}
          />
          <div className="loader">
            <Spin spinning={loading} />
          </div>
        </InfiniteScroll> */}
      </div>
    )
  }
  componentDidMount() {
    this.getMovieList()
    this.props.getWeatherInfo(this.state.city)
  }
  getMovieList() {
    let that = this
    let { pageNum, pageSize } = this.state
    Toast.loading('Loading...', 20000)
    that.setState(
      {
        loading: true,
        hasMore: false
      },
      () => {
        fetch(`/get_movies?page=${pageNum}&size=${pageSize}`, 'get')
          .then(response => {
            console.log(response)
            let list = response.data
            if (pageNum === 0) {
              if (list) {
                that.setState({
                  data: list
                })
              }
            } else {
              if (list) {
                that.setState({
                  data: that.state.data.concat(list)
                })
              }
            }
            if (list.length < pageSize) {
              that.setState({
                hasMore: false,
                loading: false
              })
            } else {
              that.setState({
                loading: true,
                pageNum: pageNum + 1,
                hasMore: true
              })
            }
            Toast.hide()
          })
          .catch(function (error) {
            console.log(error)
            Toast.hide()
            setTimeout(() => {
              Toast.fail('请求失败，请刷新', 2)
            }, 100)
            that.setState({
              loading: false,
              hasMore: true
            })
          })
      }
    )
  }
}
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    getWeatherInfo: city => {
      dispatch(getWeatherInfo(city))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
