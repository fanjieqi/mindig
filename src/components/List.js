import React, {Component} from 'react';
import {connect} from 'react-redux';
import { GlobalHotKeys  } from "react-hotkeys";
import Layer from './Layer';
import {saveList} from '../actions/index';

const mapStateToProps = (state) => {
  return {items: state.items};
};

function mapDispatchToProps(dispatch) {
  return {
    saveList: (item) => dispatch(saveList(item)),
  };
}

class ConnectedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.keyMap = {
      SAVE_LIST: "ctrl+s"
    }

    this.handlers = {
      SAVE_LIST: (event) => {
        event.preventDefault()
        this.props.saveList()
      }
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
