import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ListView, Button } from 'antd-mobile';

class HomeList extends Component {
  constructor(props) {
    super(props)
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      height: document.documentElement.clientHeight - 120,
    };
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
      });
    }
  }
  onEndReached = (event) => {
    const { isLoading, hasMore } = this.props
    if (isLoading && !hasMore) {
      return;
    }
    console.log('reach end', event);
    this.props.loadMore()
  }
  gotoDetail(data) {
    console.log(data)
    window.location.href = data
  }
  cloneBtUrl(url) { }
  renderBtn(type, url) {
    if (type === 'blank') {
      return (
        <CopyToClipboard
          text={url}
          onCopy={() => {
            console.log(9)
          }}
        >
          <Button
            type="primary"
            className="tool-button"
            onClick={this.gotoDetail.bind(this, url)}
          >
            查看详情
          </Button>
        </CopyToClipboard>
      )
    } else {
      return (
        <CopyToClipboard text={url} onCopy={() => { }}>
          <Button
            type="primary"
            className="tool-button"
            onClick={this.cloneBtUrl.bind(this, url)}
          >
            复制下载
          </Button>
        </CopyToClipboard>
      )
    }
  }
  render() {
    const { dataSource, height } = this.state
    const { data } = this.props
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 10px', width: '100vw' }}>
          <div style={{ display: 'flex', padding: '8px 0' }}>
            <img style={{ height: '64px', maxWidth: '60px' }} src={obj.postUrl} alt="" />
            <div style={{ lineHeight: 1, flex: 1, marginLeft: '15px' }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.title}</div>
              <div><span style={{ fontSize: '14px', color: '#FF6E27' }}>{obj.btUrl}</span></div>
            </div>
          </div>
          <div style={{ height: '40px', borderTop: '1px solid #f5f0f0', padding: '5px 0' }}>{this.renderBtn(obj.type, obj.btUrl)}</div>
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={dataSource}
        // renderHeader={() => {  }}
        // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
        //   {isLoading ? 'Loading...' : 'Loaded'}
        // </div>)}
        // renderSectionHeader={sectionData => (
        //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
        // )}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: height,
          overflow: 'auto',
        }}
        pageSize={4}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />)
  }
}
export default HomeList;