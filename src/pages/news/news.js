import React from 'react'
import { Affix } from 'antd'
import '../../style/weather.scss'
import { connect } from 'react-redux'
import { getNewsInfo } from '../../actions/Index'
import Aticle from './article'
class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
      type: 'plus'
    }
  }
  render() {
    // const { weatherInfo } = this.state
    return (
      <div className="news">
        <Affix>
          <h2>今日要闻</h2>
        </Affix>
        <div className="news-box">
          <Aticle
            content={this.props.data}
            title="fdjdsfjkh"
            onClick={this.props.handleClick.bind(this)}
          />
        </div>
      </div>
    )
  }
  componentDidMount() {}
  componentWillUpdate() {}
}
const mapStateToProps = state => {
  return {
    data: state.news
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: msg => {
      dispatch(getNewsInfo(msg))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News)
