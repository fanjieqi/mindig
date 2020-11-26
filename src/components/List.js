import React, {Component} from 'react';
import {connect} from 'react-redux';
import { GlobalHotKeys  } from "react-hotkeys";
import Item from './Item';
import Lines from './Lines';
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
    this.childrenRef = React.createRef();
  }

  componentDidMount() {
    this.getRectsInterval = setInterval(() => {
      if (this.childrenRef == null || this.childrenRef.current == null) return
      const { height } = this.childrenRef.current.getBoundingClientRect();
      const { childrenHeight } = this.state
      if (height !== childrenHeight) {
        console.log( this.childrenRef)
        this.setState({childrenHeight: height})
      }
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.getRectsInterval);
  }

  printItem(items, itemId, parentId = null) {
    return (
      <li className={'layer item' + itemId } key={'printItem'+itemId}>
        <div>
          <Item itemId={itemId} title={items[itemId].title} parentId={items[itemId].parentId} showMinus={items[itemId].showMinus} />
        </div>
        <Lines itemId={itemId} length={items[itemId].children.length} />
        { (items[itemId].children.length > 0) && (
          <div className={`childrenLayer ${items[itemId].isClosed ? 'closed' : 'opened'}`}  ref={this.childrenRef} key={`children${itemId}`}>
            <ul>
              {items[itemId].children.map((childId) => (
                this.printItem(items, childId, itemId)  
              ))}
            </ul>
          </div>
        )}
      </li>
    )
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
          {this.printItem(items, 0)}
        </ul>
      </GlobalHotKeys >
    )
  }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
