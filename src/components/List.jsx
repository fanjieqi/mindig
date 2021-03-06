/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GlobalHotKeys } from 'react-hotkeys';
import Layer from './Layer';
import {
  saveList, exportList, undoList, redoList,
} from '../actions/index';
import FilesTree from './FilesTree';

const mapStateToProps = (state) => ({ items: state.items, listId: state.listId });

function mapDispatchToProps(dispatch) {
  return {
    saveList: () => dispatch(saveList()),
    exportList: () => dispatch(exportList()),
    undoList: () => dispatch(undoList()),
    redoList: () => dispatch(redoList()),
  };
}

class ConnectedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesTreeVisible: false,
    };
  }

  render() {
    const ctrlKey = /(Mac)/i.test(navigator.platform) ? 'cmd' : 'ctrl';
    this.keyMap = {
      SAVE_LIST: `${ctrlKey}+s`,
      EXPORT_LIST: `${ctrlKey}+shift+s`,
      UNDO_LIST: `${ctrlKey}+z`,
      REDO_LIST: `${ctrlKey}+y`,
      SHOW_FILES_MODAL: `${ctrlKey}+o`,
    };

    this.handlers = {
      SAVE_LIST: (event) => {
        event.preventDefault();
        this.props.saveList();
      },
      EXPORT_LIST: (event) => {
        event.preventDefault();
        this.props.exportList();
      },
      UNDO_LIST: (event) => {
        event.preventDefault();
        this.props.undoList();
      },
      REDO_LIST: (event) => {
        event.preventDefault();
        this.props.redoList();
      },
      SHOW_FILES_MODAL: (event) => {
        event.preventDefault();
        this.setState({ filesTreeVisible: true });
      },
    };

    const { items } = this.props;
    const { listId } = this.props;
    const { filesTreeVisible } = this.state;
    return (
      <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers}>
        <Layer items={items} itemId={0} key={listId} />
        <FilesTree key={`FilesTree-${Date.now()}`} visible={filesTreeVisible} />
      </GlobalHotKeys>
    );
  }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
