import React from 'react'
import { List, Avatar } from 'antd'
// import '../../style/weather.scss'
// import store from '../../reducers/store'
// import { getWeatherInfo } from '../../actions/Index'
const Aticle = list => {
  return (
    <div>
      <List
        dataSource={list.content.data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.thumbnail_pic_s} />}
              title={<a href={item.url}>{item.title}</a>}
              description={item.date + item.author_name}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
export default Aticle
