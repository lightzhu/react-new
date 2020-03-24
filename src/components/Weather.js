import React from 'react'
import { Carousel, WingBlank, Picker, List } from 'antd-mobile'
import district from '../static/js/area'
import { connect } from 'react-redux'
import '../style/weather.scss'
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
      city: '宁波',
      num1: 1,
      num2: 1,
      type: 'plus',
      pickerValue: []
    }
  }
  pickerValueOk(msg) {
    let city = district.find(function (value) {
      return value['value'] === msg[0]
    })
    city = city.children.find(function (value) {
      return value['value'] === msg[1]
    })
    console.log(city)
    this.setState({
      city: city.label.replace(/市/, '')
    })
    this.props.cityChange(city.label.replace(/市/, ''))
  }
  render() {
    const { weatherInfo } = this.props
    return (
      <div>
        <h2>
          <div className="location">
            <List>
              <Picker
                title="选择地区"
                extra="请选择(可选)"
                data={district}
                value={this.state.pickerValue}
                onChange={v => this.setState({ pickerValue: v })}
                onOk={this.pickerValueOk.bind(this)}
              >
                <div
                  className="city"
                  onClick={this.props.onClick}
                  style={{ height: 70, background: 'none' }}
                >
                  {this.state.city}
                  <span>切换</span>
                </div>
              </Picker>
            </List>
          </div>
          <div className="computer-box">
            {weatherInfo ? this.renderWeather(weatherInfo.realtime) : ''}
            <div className="weather-list">
              {weatherInfo ? this.renderList(weatherInfo.future) : ''}
            </div>
          </div>
        </h2>
      </div>
    )
  }
  onNum1Change(value) {
    this.setState({
      num1: value
    })
  }
  onNum2Change(value) {
    this.setState({
      num2: value
    })
  }
  fnChange(e) {
    console.log(e.target.value)
    this.setState({
      type: e.target.value
    })
  }
  renderWeather(data) {
    if (data) {
      return (
        <ul className="real-time">
          <li>
            <span>{data.info}</span>
            <span className="other">AQI:{data.aqi}</span>
          </li>
          <li>
            <span>{data.temperature}℃</span>
            <span className="other">
              {data.direct}
              {data.power}
            </span>
          </li>
        </ul>
      )
    }
  }
  renderList(data) {
    if (!data) {
      return null
    }
    let itemList = data.map(item => {
      return (
        <div className="v-item" key={item.date}>
          {item.date +
            ' ' +
            item.weather +
            ' ' +
            item.temperature +
            ' ' +
            item.direct}
        </div>
      )
    })
    return (
      <WingBlank>
        <Carousel
          className="my-carousel"
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplayInterval={5000}
          autoplay
          infinite
        >
          {itemList}
        </Carousel>
      </WingBlank>
    )
  }
  componentDidMount() {
  }
  componentWillUpdate() { }
}
const mapStateToProps = state => {
  return {
    weatherInfo: state.weather.weather
  }
}
export default connect(mapStateToProps)(Weather)
