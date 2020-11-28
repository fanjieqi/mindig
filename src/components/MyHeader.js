import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

function mapDispatchToProps(dispatch) {
  return {
  };
}

class ConnectedHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff' }}>
        <div className="logo" >Mindig</div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="menuItem1">File</Menu.Item>
          <Menu.Item key="menuItem2">Edit</Menu.Item>
          <Menu.Item key="menuItem3">Help</Menu.Item>
        </Menu>
      </Header>
    )
  }
}

const MyHeader = connect(null, mapDispatchToProps)(ConnectedHeader);

export default MyHeader;
