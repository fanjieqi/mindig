/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FolderAddOutlined, FileAddOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Modal,
  Button,
  Tooltip,
  Tree,
  Input,
} from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  saveFiles,
  openList,
  addFile,
  // deleteFile,
} from '../actions/index';

const _ = require('lodash');

const { DirectoryTree } = Tree;
const { Search } = Input;

const mapStateToProps = (state) => ({ files: state.files });

function mapDispatchToProps(dispatch) {
  return {
    saveFiles: (item) => dispatch(saveFiles(item)),
    openList: (item) => dispatch(openList(item)),
    addFile: (item) => dispatch(addFile(item)),
    // deleteFile: (item) => dispatch(deleteFile(item)),
  };
}

const getExpandedKeys = (data, searchValue) => {
  let keys = [];
  for (let i = 0; i < data.length; i += 1) {
    const node = data[i];
    if (searchValue !== '' && node.title.includes(searchValue)) {
      keys.push(node.key);
    }
    if (node.children) {
      keys = keys.concat(getExpandedKeys(node.children, searchValue));
    }
  }
  return keys;
};

const process = (data, key, callback) => {
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].key === key) {
      return callback(data[i], i, data);
    }
    if (data[i].children && data[i].children.length > 0) {
      process(data[i].children, key, callback);
    }
  }
  return null;
};

const deleteFile = (data, selectedKeys) => {
  _.remove(data, (file) => selectedKeys.includes(file.key));
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].children && data[i].children.length > 0) {
      _.remove(data[i].children, (file) => selectedKeys.includes(file.key));
      deleteFile(data[i].children, selectedKeys);
    }
  }
  return data;
};

const setTreeData = (data, searchValue) => data.map((item) => {
  const index = item.title.indexOf(searchValue);
  const beforeStr = item.title.substr(0, index);
  const afterStr = item.title.substr(index + searchValue.length);
  const title = index > -1 ? (
    <span>
      {beforeStr}
      <span className="site-tree-search-value">{searchValue}</span>
      {afterStr}
    </span>
  ) : (
    <span>
      {item.title}
    </span>
  );
  if (item.children) {
    return { title, key: item.key, children: setTreeData(item.children, searchValue) };
  }
  return {
    title,
    key: item.key,
  };
});

class ConnectedFilesTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.files,
      listId: null,
      searchValue: '',
      expandedKeys: [],
      autoExpandParent: true,
      visible: props.visible,
      loading: false,
      selectedKeys: [],
    };
  }

  handleOk = () => {
    this.setState({ loading: true });
    const { listId } = this.state;
    this.props.openList({ listId });
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleDoubleClick = () => {
    this.setState({ visible: false });
  }

  onSelect = (keys, info) => {
    this.setState({ selectedKeys: keys });
    this.setState({ listId: info.node.key });
  };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = (e) => {
    const { value } = e.target;
    const { files } = this.state;
    const expandedKeys = getExpandedKeys(files, value);

    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  onDrop = (info) => {
    const dropKey = info.node.key;
    console.log('dropKey', dropKey);
    const dragKey = info.dragNode.key;
    console.log('dragKey', dragKey);
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const { files } = this.state;
    const data = [...files];

    // Find dragObject
    let dragObj;
    process(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      process(data, dropKey, (item) => {
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0
      && info.node.props.expanded
      && dropPosition === 1
    ) {
      process(data, dropKey, (item) => {
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      process(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({ files: data });
    this.props.saveFiles({ files: data });
  };

  handleFolderAdd = () => {
    const { files, searchValue, listId } = this.state;
    const file = {
      isLeaf: false,
      title: searchValue,
      key: uuidv4(),
      children: [],
    };
    if (listId) {
      process(files, listId, (item) => item.children.push(file));
    } else {
      files.push(file);
    }
    this.setState({ files });
    this.props.saveFiles({ files });
  }

  handleFileAdd = () => {
    const { files, searchValue, listId } = this.state;
    const file = {
      isLeaf: true,
      title: searchValue,
      key: uuidv4(),
      children: [],
    };
    if (listId) {
      process(files, listId, (item) => item.children.push(file));
    } else {
      files.push(file);
    }
    this.setState({ files });
    this.props.saveFiles({ files });
    this.props.addFile({ title: file.title, key: file.key });
  }

  handleDelete = () => {
    const { files, selectedKeys } = this.state;
    const newFiles = deleteFile(files, selectedKeys);
    this.setState({ files: newFiles });
    this.props.saveFiles({ files: newFiles });
  }

  render() {
    const { visible, loading } = this.state;
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const modalFooter = [
      <Button key="back" onClick={this.handleCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
        Open
      </Button>,
    ];
    const { files } = this.props;

    return (
      <Modal visible={visible} title="Open File" onOk={this.handleOk} onCancel={this.handleCancel} footer={modalFooter}>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <div className="icons-list">
          <Tooltip title="Add Folder">
            <Button icon={<FolderAddOutlined />} onClick={this.handleFolderAdd} size={20} />
          </Tooltip>
          <Tooltip title="Add File">
            <Button icon={<FileAddOutlined />} onClick={this.handleFileAdd} size={20} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<DeleteOutlined />} onClick={this.handleDelete} size={20} />
          </Tooltip>
        </div>
        <DirectoryTree
          multiple
          draggable
          blockNode
          defaultExpandAll
          height={300}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.onSelect}
          onExpand={this.onExpand}
          onDrop={this.onDrop}
          treeData={setTreeData(files, searchValue)}
        />
      </Modal>
    );
  }
}

ConnectedFilesTree.propTypes = {
  visible: PropTypes.bool.isRequired,
  files: PropTypes.arrayOf(() => true).isRequired,
};

const FilesTree = connect(mapStateToProps, mapDispatchToProps)(ConnectedFilesTree);

export default FilesTree;
