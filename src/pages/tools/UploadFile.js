import React from 'react'
import { Button, ImagePicker, WhiteSpace, Toast } from 'antd-mobile'
import axios from 'axios'
import fetch from '@/static/js/request'
import '../../style/tool.scss'
// const data = [{
//   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//   id: '2121',
// }];
class UploadFile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      loadText: '上传中...',
      loadedList: [],
      selectable: true
    }
    this.getInitData = this.props.getInitData
  }
  componentDidMount() {
    // this.getInitData(this.state.type)
    // this.autoFocusInst.focus();
  }
  uploadFile() {
    let { files } = this.state
    let formData = new FormData()
    console.log(this.state.files)
    files.forEach(item => {
      formData.append('file', item.file)
    })
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    // 上传七牛http://192.168.1.222:9090/upload
    Toast.loading(this.state.loadText, 0);
    axios
      .post('https://api.2048888.xyz/uploadpic', formData, config)
      .then(response => {
        if (response.msg === '上传成功') {
          let titleArr = response.data.map(item => {
            // return {
            //   hashname: item.hashname,
            //   _id: item._id,
            //   name: item.image_name,
            //   type: item.type
            // }
            return item._id
          })
          setTimeout(() => {
            //titleArr.toString()
            this.getUploadPic(titleArr.toString()) // JSON.stringify(titleArr)
          }, 5000)
        }
      })
      .catch(function (error) {
        Toast.hide()
        Toast.fail('上传失败', 2)
        console.log(error);
      })
  }
  getUploadPic = (titles) => {
    // console.log(titles)
    fetch(`/piclist?titles=${titles}`, 'get')
      .then(response => {
        console.log(response)
        Toast.hide()
        this.setState({
          files: [],
          loadedList: response.data
        })
      })
      .catch(err => {
        Toast.hide()
        Toast.fail('加载失败', 2)
        console.log(err)
      })
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    if (files.length > 2) {
      this.setState({
        files,
        selectable: false
      })
    } else {
      this.setState({
        files,
        selectable: true
      })
    }
  }
  componentWillUnmount() {
    // clearInterval(timer)
  }
  render() {
    const { files, loadedList, selectable } = this.state
    return (
      <div >
        <div className="head">轻云--图床</div>
        <WhiteSpace size="xl" />
        <div className="qing">
          <div style={{ textAlign: 'center' }}>
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={selectable}
              length='3'
              multiple={true}
            />
          </div>
          <WhiteSpace size="xl" />
          <div className="">
            <Button type="primary" onClick={this.uploadFile.bind(this)}>上传</Button>
          </div>
          <WhiteSpace size="xl" />
          {loadedList.map(item => {
            return (
              <div key={item._id}><img alt={item.name} src={item.image_content}></img></div>
            )
          })}
        </div>
      </div>
    )
  }
}
export default UploadFile
