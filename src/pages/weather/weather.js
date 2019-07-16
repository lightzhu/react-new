import React from 'react'
import { Affix, List } from 'antd'
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
        <Affix>
          <h2>今日天气</h2>
        </Affix>
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
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <h4>{item.date}</h4>
            <p>
              <span>{item.weather}</span>
              <span>{item.temperature}</span>
              <span>{item.direct}</span>
            </p>
          </List.Item>
        )}
      />
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
  componentWillUpdate() {}
}
export default Weather
