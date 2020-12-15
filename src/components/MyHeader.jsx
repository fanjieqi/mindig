/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Layout, Menu, Divider, Typography, Avatar, Badge,
} from 'antd';
import {
  FileOutlined, EditOutlined, QuestionCircleOutlined, BellOutlined, UserOutlined, SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {
  newList, saveList, exportList, undoList, redoList,
} from '../actions/index';
import FilesModal from './FilesModal';

const { Header } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

function mapDispatchToProps(dispatch) {
  return {
    newList: () => dispatch(newList()),
    saveList: () => dispatch(saveList()),
    exportList: () => dispatch(exportList()),
    undoList: () => dispatch(undoList()),
    redoList: () => dispatch(redoList()),
  };
}

class ConnectedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesModalVisible: false,
      selectedKeys: [],
    };
  }

  handleBlur = (event) => {
    event.preventDefault();
  }

  handleSelect = (event) => {
    if (event.key === 'fileMenu:newList') {
      this.props.newList();
    } else if (event.key === 'fileMenu:showFilesModal') {
      this.setState({ filesModalVisible: true });
    } else if (event.key === 'fileMenu:saveList') {
      this.props.saveList();
    } else if (event.key === 'fileMenu:exportList') {
      this.props.exportList();
    } else if (event.key === 'editMenu:undoList') {
      this.props.undoList();
    } else if (event.key === 'editMenu:redoList') {
      this.props.redoList();
    }
  }

  render() {
    const notificationTitle = (
      <span className="notificationItem">
        <Badge count={1}>
          <BellOutlined style={{ fontSize: '25px', marginRight: '0px' }} />
        </Badge>
      </span>
    );

    const userTitle = (
      <span>
        <Avatar icon={<UserOutlined />} />
        <span style={{ marginLeft: '10px' }}>Jackie Fan</span>
      </span>
    );

    const { filesModalVisible } = this.state;
    const ctrlKey = /(Mac)/i.test(navigator.platform) ? 'Cmd' : 'Ctrl';

    return (
      <Header style={{
        position: 'fixed', zIndex: 1, width: '100%', background: '#fff',
      }}
      >
        <div className="logo">Mindig</div>
        <FilesModal key={Date.now()} visible={filesModalVisible} />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} onSelect={this.handleSelect} onBlur={this.handleBlur} selectedKeys={[this.state.selectedKeys]}>
          <SubMenu key="SubMenu1" title="File" icon={<FileOutlined />}>
            <Menu.Item key="fileMenu:newList" style={{ minWidth: '200px' }}>
              <Text>New File</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+N`}
              </Text>
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item key="fileMenu:showFilesModal">
              <Text>Open File</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+O`}
              </Text>
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item key="fileMenu:saveList">
              <Text>Save</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+S`}
              </Text>
            </Menu.Item>
            <Menu.Item key="fileMenu:exportList">
              <Text>Save as</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+Shift+S`}
              </Text>
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item key="fileMenu:5">Preferences</Menu.Item>
          </SubMenu>

          <SubMenu key="SubMenu2" title="Edit" icon={<EditOutlined />}>
            <Menu.Item key="editMenu:undoList" style={{ minWidth: '200px' }}>
              <Text>Undo</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+Z`}
              </Text>
            </Menu.Item>
            <Menu.Item key="editMenu:redoList">
              <Text>Redo</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+Y`}
              </Text>
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item key="editMenu:3">
              <Text>Cut</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+X`}
              </Text>
            </Menu.Item>
            <Menu.Item key="editMenu:4">
              <Text>Copy</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+C`}
              </Text>
            </Menu.Item>
            <Menu.Item key="editMenu:5">
              <Text>Paste</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+Y`}
              </Text>
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item key="editMenu:6">
              <Text>Find</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+F`}
              </Text>
            </Menu.Item>
            <Menu.Item key="editMenu:7">
              <Text>Replace</Text>
              <Text type="secondary" className="fileMenuShortCut">
                {`${ctrlKey}+H`}
              </Text>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="SubMenu3" title="Help" icon={<QuestionCircleOutlined />}>
            <Menu.Item key="helpMenu:1" style={{ minWidth: '200px' }}>Document</Menu.Item>
            <Menu.Item key="helpMenu:2">Release Notes</Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item key="helpMenu:3">About</Menu.Item>
          </SubMenu>

          <SubMenu key="SubMenu5" title={userTitle} style={{ float: 'right' }}>
            <Menu.Item key="userMenu:1" icon={<UserOutlined />} style={{ minWidth: '200px' }}>Profile</Menu.Item>
            <Menu.Item key="userMenu:2" icon={<SettingOutlined />}>Setting</Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item key="userMenu:3" icon={<LogoutOutlined />}>Logout</Menu.Item>
          </SubMenu>

          <SubMenu key="SubMenu4" title={notificationTitle} style={{ float: 'right' }} />
        </Menu>
      </Header>
    );
  }
}

const MyHeader = connect(null, mapDispatchToProps)(ConnectedHeader);

export default MyHeader;
