import React from 'react'
import { Affix } from 'antd'
import '../../style/home.scss'
import { connect } from 'react-redux'
import { getNewsInfo } from '../../actions/Index'
import Aticle from './article'
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
  }
  render() {
    // const { weatherInfo } = this.state
    return (
      <div className="news">
        <Affix>
          <h2>今日要闻</h2>
        </Affix>
        <select onChange={this.newTypeChange.bind(this)}>
          {this.renderSelect(this.state.newsType)}
        </select>
        <div className="news-box">
          <Aticle content={this.props.data} title="fdjdsfjkh" />
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.props.getInitData(this.state.type)
  }
  componentWillUpdate() {}
  renderSelect(types) {
    let arr = []
    types.forEach((element, index) => {
      arr.push(
        <option key={index} value={element.val}>
          {element.name}
        </option>
      )
    })
    return arr
  }
  newTypeChange(e) {
    console.log(e.target.value)
    this.setState(
      {
        type: e.target.value
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News)
