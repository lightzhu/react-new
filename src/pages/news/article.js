import React from 'react'
import { List } from 'antd-mobile'
import '../../style/news.scss'
const Item = List.Item
const Brief = Item.Brief
const Aticle = list => {
  const data = list.content.data
  const renderList = () => {
    const list = data.map((item, index) => {
      return (
        <List key={index} renderHeader={() => { }} className="my-list" onClick={() => {
          window.location.href = item.url
        }}>
          <Item onClick={() => { }} align="top" thumb={item.thumbnail_pic_s
            ? item.thumbnail_pic_s
            : item.thumbnail_pic_s02} multipleLine>
            <span className="title">{item.title}</span>
            <Brief>{item.date}<span className="author">{item.author_name}</span></Brief>
          </Item>
        </List>
      )
    })
    return list
  }
  return (
    <div className="article">
      {renderList()}
    </div>
  )
}
export default Aticle
