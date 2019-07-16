import React from 'react'
import { List } from 'antd'
// import '../../style/weather.scss'
// import store from '../../reducers/store'
// import { getWeatherInfo } from '../../actions/Index'
const Aticle = list => {
  return (
    <div
      onClick={() => {
        list.onClick('top')
      }}
    >
      <List
        dataSource={list.content.data}
        renderItem={item => (
          <List.Item>
            <h4>{item.title}</h4>
          </List.Item>
        )}
      />
    </div>
  )
}
export default Aticle
