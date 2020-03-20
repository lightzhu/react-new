import React from 'react'
import '../../style/weather.scss'
import store from '../../reducers/store'
import { getWeatherInfo } from '../../actions/Index'
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
      weatherInfo: store.getState().weather.data
    }
  }
  render() {
    const { weatherInfo } = this.state
    return (
      <div className="home">
        <div className="computer-box">
          {weatherInfo ? this.renderWeather(weatherInfo.realtime) : ''}
          <div className="weather-list">
            {weatherInfo ? this.renderList(weatherInfo.future) : ''}
          </div>
        </div>
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
            <span>当前</span>
            <span>{data.info}</span>
          </li>
          <li>
            <span>AQI</span>
            <span>{data.aqi}</span>
          </li>
          <li>
            <span>气温</span>
            <span>{data.temperature}℃</span>
          </li>
          <li>
            <span>{data.direct}</span>
            <span>{data.power}</span>
          </li>
        </ul>
      )
    }
  }
  renderList(data) {
    return (

    )
  }
  componentDidMount() {
    let that = this
    store.dispatch(getWeatherInfo('宁波'))
    store.subscribe(() => {
      that.setState(
        {
          weatherInfo: store.getState().weather.data
        },
        () => {
          console.log(that.state.weatherInfo)
        }
      )
    })
  }
  componentWillUpdate() { }
}
export default Weather
