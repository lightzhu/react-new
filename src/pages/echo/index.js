import React, { Component } from 'react';
import { NoticeBar, PullToRefresh, Icon, Toast, Button, ImagePicker, Modal, InputItem, TextareaItem } from 'antd-mobile'
import EchoList from '../../components/EchoList'
import compressImage from '../../components/compressImage'
import fetch from '@/static/js/request'
import axios from 'axios'
import '../../style/echo.scss'
// const API_URL = 'https://webadd.herokuapp.com'
const API_URL = 'https://api.2048888.xyz'
class Echo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight - 80,
      data: [],
      loading: true,
      hasMore: true,
      files: [],
      imgUrl: null,
      popupShow: false,
      title: '',
      content: ''
    }
  }
  componentDidMount() {
    this.getTopics()
  }
  getTopics() {
    //获取热点数据接口
    fetch(`/getTopics`, 'get')
      .then(response => {
        console.log(response)
        this.setState({
          data: response.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  loadMore() {
    // debugger
    if (this.state.hasMore) {
      // this.getMovieList()
      console.log('获取更多')
    }
  }
  onFileChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files
    })
  }
  showModal(e) {
    e.preventDefault();
    if (window.sessionStorage.getItem('logined') !== 'true') {
      return Toast.info('请先登陆！')
    }
    this.setState({
      popupShow: true,
    });
  }
  onClose() {
    this.setState({
      popupShow: false
    });
  }
  handleUserInput(val) {
    this.setState({
      title: val
    })
  }
  handleContentInput(val) {
    this.setState({
      content: val
    })
  }
  handleSubmit() {
    let formData = new FormData()
    const { files, title, content } = this.state
    if (title === '') {
      return Toast.info('标题不能为空')
    }
    if (files[0].file.size > 500000) {
      return Toast.info('图片大于500KB,重新选择')
    }
    compressImage(files[0].url, 0.5, (resp) => {
      // console.log(resp.size)
      formData.append('file', resp)
      formData.append('title', title)
      formData.append('content', content)
      formData.append('user_id', window.sessionStorage.getItem('userId'))
      formData.append('username', window.sessionStorage.getItem('username'))
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      Toast.loading("Loading...", 20000)
      axios
        .post(`${API_URL}/fileupload`, formData, config)
        .then(response => {
          console.log(response)
          if (response.code === 200) {
            this.setState({
              title: '',
              files: [],
              content: '',
              popupShow: false
            })
          }
          Toast.hide()
          setTimeout(() => {
            this.getTopics()
          }, 2000)
        })
        .catch((err) => {
          Toast.hide()
        })
    })
  }
  render() {
    const { data, loading, files } = this.state
    return (<div className="echo">
      <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
        Notice: 二傻子发布了一条消息，大家都在讨论，快去围观
    </NoticeBar>
      {/* <img src={this.state.imgUrl}></img> */}
      <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
        {/* {this.state.data.map(i => (
          <div key={i} style={{ textAlign: 'center', padding: 20 }}>
            {this.state.down ? 'pull down' : 'pull up'} {i}
          </div>
        ))} */}
        <EchoList data={data} loading={loading} loadMore={this.loadMore.bind(this)}></EchoList>
      </PullToRefresh>
      <Modal
        popup
        visible={this.state.popupShow}
        onClose={this.onClose.bind(this)}
        animationType="slide-up"
      // afterClose={() => { alert('afterClose'); }}
      >
        <div className="popup-box">
          <InputItem
            type="text"
            placeholder="说点什么吧"
            error={this.state.hasError}
            onChange={this.handleUserInput.bind(this)}
            value={this.state.title}
          >标题:</InputItem>
          <TextareaItem
            value={this.state.content}
            placeholder="输入内容在200字内"
            onChange={this.handleContentInput.bind(this)}
            autoHeight
            labelNumber={5}
          />
          <ImagePicker
            files={files}
            onChange={this.onFileChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 1}
          />
          <div className="btn-box">
            <Button
              size="small"
              type="warning"
              onClick={this.onClose.bind(this)}
              className="login-form-button"
            >
              取消
          </Button>
            <Button
              size="small"
              type="primary"
              onClick={this.handleSubmit.bind(this)}
              className="login-form-button"
            >
              发布
          </Button>
          </div>

        </div>
      </Modal>
      <div className="add-new" onClick={this.showModal.bind(this)}>
        <Icon type="cross" color="#fff" size='lg' />
      </div>
    </div>)
  }
}
export default Echo;