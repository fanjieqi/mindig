import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Modal, Button, List } from 'antd';
import {openList} from '../actions/index';
import { purple } from '@ant-design/colors';
var _ = require('lodash');

const mapStateToProps = (state) => {
  return { filesModal: state.filesModal, lists: state.lists };
};

function mapDispatchToProps(dispatch) {
  return {
    openList: (item) => dispatch(openList(item)),
  };
}

class ConnectedFilesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      loading: false,
      listId: null,
    }
  }

  handleOk = () => {
    this.setState({ loading: true });
    this.props.openList({listId: this.state.listId})
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleClick = (listId) => {
    this.setState({ listId: listId });
  }

  handleDoubleClick = (listId) => {
    this.props.openList({listId: listId})
    this.setState({ visible: false });
  }

  render() {
    const {visible, loading} = this.state;
    const modalFooter = [
      <Button key="back" onClick={this.handleCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
        Open
      </Button>,
    ]
    const { lists } = this.props;
    const infos = _.map(Object.keys(lists), (key) => lists[key].info);
    return (
      <Modal visible={visible} title="Open File" onOk={this.handleOk} onCancel={this.handleCancel} footer={modalFooter} >
        <List size="small" bordered dataSource={infos} style={{overflowY: 'scroll', maxHeight: '18rem'}} 
          renderItem={info => 
            <List.Item listId={info.listId} key={info.listId}
              onClick={this.handleClick.bind(this, info.listId)}
              onDoubleClick={this.handleDoubleClick.bind(this, info.listId)}
              className={this.state.listId === info.listId ? 'active' : null}
            >
              {info.fileName}
            </List.Item>
          }
        />
      </Modal>
    )
  }
}

const FilesModal = connect(mapStateToProps, mapDispatchToProps)(ConnectedFilesModal);

export default FilesModal;
