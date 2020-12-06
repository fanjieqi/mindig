import React, {Component} from 'react';
import {connect} from 'react-redux';
import { GlobalHotKeys  } from "react-hotkeys";
import Layer from './Layer';
import { saveList, exportList, undoList, redoList } from '../actions/index';

const mapStateToProps = (state) => {
  return {items: state.items};
};

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
  }

  render() {
    this.keyMap = {
      SAVE_LIST: "ctrl+s",
      EXPORT_LIST: 'ctrl+shift+s',
      UNDO_LIST: 'ctrl+z',
      REDO_LIST: 'ctrl+y',
    }

    this.handlers = {
      SAVE_LIST: (event) => {
        event.preventDefault()
        this.props.saveList()
      },
      EXPORT_LIST: (event) => {
        event.preventDefault()
        this.props.exportList()
      },
      UNDO_LIST: (event) => {
        event.preventDefault()
        this.props.undoList()
      },
      REDO_LIST: (event) => {
        event.preventDefault()
        this.props.redoList()
      },
    }

    const {items} = this.props;
    return (
      <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers}>
        <ul className='itemsArea'>
          <Layer items={items} itemId={0} key={0}/>
        </ul>
      </GlobalHotKeys >
    )
  }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
