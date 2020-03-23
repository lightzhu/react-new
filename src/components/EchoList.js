import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import heart from '../static/icon/heart.png'
import message from '../static/icon/message.png'
import './index.scss'
class EchoList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      height: document.documentElement.clientHeight - 40,
    };
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.rData = genData();
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(this.rData),
  //       isLoading: false,
  //     });
  //   }, 600);
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
      });
    }
  }

  onEndReached = (event) => {
    console.log('reach end', event);
    this.props.loadMore();
    // this.setState({ isLoading: true });
    // setTimeout(() => {
    //   this.rData = { ...this.rData, ...genData(++pageIndex) };
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 1000);
  }

  render() {
    const { data, loading } = this.props
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px', borderTop: '20px solid #f5f5f9' }}>
          <div className="content-head">
            <h5>
              <img src="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"></img>
              <span>用户名</span>
            </h5>
          </div>
          <div className="content-body">
            <p>This is content of `Card`,This is content of `Card`,This is content of `Card`
            This is content of `Card`,This is content of `Card`
            </p>
            <p className="img-box">
              <img src='//wx3.sinaimg.cn/mw600/0085KTY1gy1gd1xptnkdoj31400u0e81.jpg' alt="" />
            </p>
          </div>
          <div className="content-foot"><img src={heart} alt='' /><img src={message} alt='' /></div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
          {loading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        className="am-list"
        pageSize={4}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        useBodyScroll={false}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default EchoList;