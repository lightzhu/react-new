import React from 'react'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { getNewsInfo } from '../../actions/Index'
import Aticle from './article'
import '../../style/home.scss'

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
  componentDidMount() {
    // this.getInitData(this.state.type)
  }
  componentDidUpdate(prevProps, prevState, nextProps) {

  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, this.props)
    if (nextProps.data !== this.props.data) {
      Toast.hide()
    }
  }
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
  newTypeChange(event) {
    console.log(event.target.value)
    this.setState(
      {
        type: event.target.value
      },
      () => {
        Toast.loading("Loading...", 20000)
        this.props.getInitData(this.state.type).catch(() => {
          console.log(0)
        })
      }
    )
  }
  render() {
    // const { weatherInfo } = this.state 
    return (
      <div className="news">
        <div style={{ textAlign: 'center' }}>
          <select
            value={this.state.type}
            onChange={this.newTypeChange.bind(this)}
            style={{ marginTop: 10 }}
          >
            {this.renderSelect(this.state.newsType)}
          </select>
        </div>

        <div className="news-box">
          <Aticle content={this.props.data} title="fdjdsfjkh" />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  console.log(state)
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
