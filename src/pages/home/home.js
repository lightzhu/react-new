import React from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload'
import { List, Avatar, Button, Skeleton, Affix } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import '../../style/home.scss'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{}, {}, {}],
      loading: true
    }
  }
  gotoDetail(data) {
    console.log(data)
    window.location.href = data
  }
  cloneBtUrl(url) {}
  renderBtn(type, url) {
    if (type === 'blank') {
      return (
        <CopyToClipboard
          text={url}
          onCopy={() => {
            console.log(9)
          }}
        >
          <Button
            type="primary"
            className="tool-button"
            onClick={this.gotoDetail.bind(this, url)}
          >
            点击查看详情
          </Button>
        </CopyToClipboard>
      )
    } else {
      return (
        <CopyToClipboard text={url} onCopy={() => {}}>
          <Button
            type="primary"
            className="tool-button"
            onClick={this.cloneBtUrl.bind(this, url)}
          >
            点击复制下载链接
          </Button>
        </CopyToClipboard>
      )
    }
  }
  render() {
    const { data, loading } = this.state
    return (
      <div className="home">
        <Affix>
          <h2>聚合电影</h2>
        </Affix>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              {/* <List.Item.Meta
                avatar={<Avatar className="avatar" src={item.postUrl} />}
                title={
                  <a href="http://tfboy.gearhostpreview.com">{item.title}</a>
                }
                description={item.btUrl}
              /> */}
              {this.renderBtn(item.type, item.btUrl)}

              <LazyLoad>
                <Skeleton loading={loading} active avatar>
                  <List.Item.Meta
                    avatar={<Avatar className="avatar" src={item.postUrl} />}
                    title={
                      <a href="http://tfboy.gearhostpreview.com">
                        {item.title}
                      </a>
                    }
                    description={item.btUrl}
                  />
                </Skeleton>
              </LazyLoad>
            </List.Item>
          )}
        />
      </div>
    )
  }
  componentDidMount() {
    let that = this
    axios
      .get('/get_movies')
      .then(function(response) {
        console.log(response)
        let list = response.data.data
        if (list) {
          that.setState(
            {
              data: list
            },
            function() {
              this.setState({ loading: false })
            }
          )
        }
      })
      .catch(function(error) {
        console.log(error)
      })
      .finally(function() {})
  }
}

export default Home
