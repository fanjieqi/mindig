import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Layout, Menu, Divider, Typography, Avatar, Badge } from 'antd';
import { FileOutlined, EditOutlined, QuestionCircleOutlined, BellOutlined, UserOutlined, } from '@ant-design/icons';
const { Header } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

function mapDispatchToProps(dispatch) {
  return {
  };
}

class ConnectedHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notificationTitle = (
      <span className="notificationItem">
        <Badge count={1}>
          <BellOutlined style={{fontSize: '25px', marginRight: '0px'}}/>
        </Badge>
      </span>
    )

    const userTitle = (
      <span>
        <Avatar icon={<UserOutlined />} />
        <span style={{marginLeft: '10px'}}>Jackie Fan</span>
      </span>
    )

    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff' }}>
        <div className="logo" >Mindig</div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          <SubMenu key="SubMenu1" title="File" icon={<FileOutlined />}>
            <Menu.Item key="fileMenu:1" style={{minWidth: '200px'}}>
              <Text>New File</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+N</Text>
            </Menu.Item>
            <Divider style={{margin: 0}}/>
            <Menu.Item key="fileMenu:2">
              <Text>Open File</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+O</Text>
            </Menu.Item>
            <Divider style={{margin: 0}}/>
            <Menu.Item key="fileMenu:3">
              <Text>Save</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+S</Text>
            </Menu.Item>
            <Menu.Item key="fileMenu:4">
              <Text>Save as</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+Shift+S</Text>
            </Menu.Item>
            <Divider style={{margin: 0}}/>
            <Menu.Item key="fileMenu:5">Preferences</Menu.Item>
          </SubMenu>
          
          <SubMenu key="SubMenu2" title="Edit" icon={<EditOutlined />}>
            <Menu.Item key="editMenu:1" style={{minWidth: '200px'}}>
              <Text>Undo</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+Z</Text>
            </Menu.Item>
            <Menu.Item key="editMenu:2">
              <Text>Redo</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+Y</Text>
            </Menu.Item>
            <Divider style={{margin: 0}}/>
            <Menu.Item key="editMenu:3">
              <Text>Cut</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+X</Text>
            </Menu.Item>
            <Menu.Item key="editMenu:4">
              <Text>Copy</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+C</Text>
            </Menu.Item>
            <Menu.Item key="editMenu:5">
              <Text>Paste</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+Y</Text>
            </Menu.Item>
            <Divider style={{margin: 0}}/>
            <Menu.Item key="editMenu:6">
              <Text>Find</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+F</Text>
            </Menu.Item>
            <Menu.Item key="editMenu:7">
              <Text>Replace</Text>
              <Text type="secondary" className='fileMenuShortCut'>Ctrl+H</Text>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="SubMenu3" title="Help" icon={<QuestionCircleOutlined />}>
            <Menu.Item key="helpMenu:1" style={{minWidth: '200px'}}>Document</Menu.Item>
            <Menu.Item key="helpMenu:2">Release Notes</Menu.Item>
            <Divider style={{margin: 0}}/>
            <Menu.Item key="helpMenu:3">About</Menu.Item>
          </SubMenu>

          <SubMenu key="SubMenu5" title={userTitle} style={{float: 'right'}}>
            <Menu.Item key="userMenu:1" style={{minWidth: '200px'}}>Profile</Menu.Item>
            <Menu.Item key="userMenu:2">Setting</Menu.Item>
          </SubMenu>

          <SubMenu key="SubMenu4" title={notificationTitle} style={{float: 'right'}}>
          </SubMenu>
        </Menu>
      </Header>
    )
  }
}

const MyHeader = connect(null, mapDispatchToProps)(ConnectedHeader);

export default MyHeader;
