import React from 'react'
import { Select } from 'antd'
import '../../style/home.scss'
import { connect } from 'react-redux'
import { getNewsInfo } from '../../actions/Index'
import Aticle from './article'
const Option = Select.Option

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
      type: 'top',
      newsType: [
        {
          name: '头条',
          val: 'top'
        },
        {
          name: '社会',
          val: 'shehui'
        },
        {
          name: '国内',
          val: 'guonei'
        },
        {
          name: '国际',
          val: 'guoji'
        },
        {
          name: '娱乐',
          val: 'yule'
        },
        {
          name: '体育',
          val: 'tiyu'
        },
        {
          name: '军事',
          val: 'junshi'
        },
        {
          name: '科技',
          val: 'keji'
        },
        {
          name: '财经',
          val: 'caijing'
        },
        {
          name: '时尚',
          val: 'shishang'
        }
      ]
    }
    this.getInitData = this.props.getInitData
  }
  render() {
    // const { weatherInfo } = this.state 
    return (
      <div className="news">
        <div style={{ textAlign: 'center' }}>
          <Select
            defaultValue={this.state.newsType[0].name}
            onChange={this.newTypeChange.bind(this)}
            style={{ width: 190, marginTop: 10 }}
          >
            {this.renderSelect(this.state.newsType)}
          </Select>
        </div>

        <div className="news-box">
          <Aticle content={this.props.data} title="fdjdsfjkh" />
        </div>
      </div>
    )
  }
  componentDidMount() {

  }
  // componentDidUpdate() {
  //   this.props.getInitData(this.state.type)
  // }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.selected) {
      this.getInitData(this.state.type)
    }
  }
  renderSelect(types) {
    let arr = []
    types.forEach((element, index) => {
      arr.push(
        <Option key={index} value={element.val}>
          {element.name}
        </Option>
      )
    })
    return arr
  }
  newTypeChange(value) {
    this.setState(
      {
        type: value
      },
      () => {
        this.props.getInitData(this.state.type)
      }
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
    getInitData: msg => {
      dispatch(getNewsInfo(msg))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(News)
