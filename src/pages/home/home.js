import React from 'react'
import axios from 'axios'
import List from 'antd/es/list'
import Avatar from 'antd/es/avatar'
import Button from 'antd/es/button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import '../../style/home.scss'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          title: '[BT下载][你和我XXX][HD-MP4/1.6G][泰语中字][720P]',
          id: 21737,
          postUrl:
            'https://www.btbttpic.com/upload/attach/000/118/a6d8f09dfe127e564a0ecb8c95eba4ff.jpg',
          type: 'blank',
          btUrl: 'http://www.1btbtt.com/thread-index-fid-1-tid-21737.htm'
        },
        {
          title: '[BT下载][你和我XXX][HD-MP4/1.6G][泰语中字][720P]',
          id: 21737,
          postUrl:
            'https://www.btbttpic.com/upload/attach/000/118/a6d8f09dfe127e564a0ecb8c95eba4ff.jpg',
          type: 'blank',
          btUrl: 'http://www.1btbtt.com/thread-index-fid-1-tid-21737.htm'
        }
      ]
    }
  }
  gotoDetail(data) {
    console.log(data)
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
    const { data } = this.state
    return (
      <div className="home">
        <h2>聚合电影</h2>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar className="avatar" src={item.postUrl} />}
                title={
                  <a href="http://tfboy.gearhostpreview.com">{item.title}</a>
                }
                description={item.btUrl}
              />
              {this.renderBtn(item.type, item.btUrl)}
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
          that.setState({
            data: list
          })
        }
      })
      .catch(function(error) {
        console.log(error)
      })
      .finally(function() {})
  }
}

export default Home
