import React, {Component} from 'react';
import {connect} from 'react-redux';
import { GlobalHotKeys  } from "react-hotkeys";
import Item from './Item';
import Lines from './Lines';
import Layer from './Layer';
import {saveItems} from '../actions/index';

const mapStateToProps = (state) => {
  return {items: state.items};
};

function mapDispatchToProps(dispatch) {
  return {
    saveItems: (item) => dispatch(saveItems(item)),
  };
}

class ConnectedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootX: props.rootX,
      rootY: props.rootY
    }
  }

  render() {
    this.keyMap = {
      SAVE_ITEMS: "ctrl+s"
    }

    this.handlers = {
      SAVE_ITEMS: (event) => {
        event.preventDefault()
        this.props.saveItems()
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
