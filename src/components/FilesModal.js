import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Modal, Button } from 'antd';

const mapStateToProps = (state) => {
  return { filesModal: state.filesModal };
};

function mapDispatchToProps(dispatch) {
  return {
  };
}

class ConnectedFilesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      loading: false,
    }
  }

  handleOk = () => {
    this.setState({ loading: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

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
    return (
      <Modal visible={visible} title="Open File" onOk={this.handleOk} onCancel={this.handleCancel} footer={modalFooter} >
      </Modal>
    )
  }
}

const FilesModal = connect(mapStateToProps, mapDispatchToProps)(ConnectedFilesModal);

export default FilesModal;
