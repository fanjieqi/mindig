import React, {Component} from 'react';
import {connect} from 'react-redux';
import { GlobalHotKeys  } from "react-hotkeys";
import Item from './Item';
import {saveItems} from '../actions/index';

const mapStateToProps = (state) => {
  return {items: state.items};
};

function mapDispatchToProps(dispatch) {
  return {
    saveItems: (item) => dispatch(saveItems(item))
  };
}

const printItem = (items, itemId) => (
  <li className='layer' key={itemId}>
    <div>
      <Item itemId={itemId} title={items[itemId].title} parentId={items[itemId].parentId} showMinus={items[itemId].showMinus}/>
    </div>
    <div className={items[itemId].isClosed ? 'childrenLayer closed' : 'childrenLayer opened'}>
      <ul>
        { items[itemId].children.length > 0 && items[itemId].children.map((childId) => (
          printItem(items, childId)
        ))}
      </ul>
    </div>
  </li>
)

class ConnectedList extends Component {
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
          {printItem(items, 0)}
        </ul>
      </GlobalHotKeys >
    )
  }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
