import React from 'react';
import {connect} from 'react-redux';
import Item from './Item';

const mapStateToProps = (state) => {
  return {items: state.items};
};

const printItem = (items, itemId) => (
  <li className='layer' key={itemId}>
    <div>
      <Item itemId={itemId} title={items[itemId].title} parentId={items[itemId].parentId}/>
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

const ConnectedList = ({items}) => (
  <ul>
    {printItem(items, 0)}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
