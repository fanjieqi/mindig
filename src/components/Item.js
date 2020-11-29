import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addItem, saveItem, closeItem, openItem, deleteItem} from '../actions/index';
import { FaPlus, FaMinus } from 'react-icons/fa';

function mapDispatchToProps(dispatch) {
  return {
    addItem: (item) => dispatch(addItem(item)),
    saveItem: (item) => dispatch(saveItem(item)),
    closeItem: (item) => dispatch(closeItem(item)),
    openItem: (item) => dispatch(openItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item)),
  };
}

class ConnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      itemId: props.itemId,
      parentId: props.parentId,
      isClosed: props.isClosed,
      showMinus: props.showMinus,
      keysPress: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick(event) {
    let {itemId, isClosed} = this.state
    this.setState({isClosed: !isClosed})
    if (!isClosed) {
      this.props.closeItem({itemId: itemId})
    } else {
      this.props.openItem({itemId: itemId})
    }
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    const {itemId, title} = this.state;
    this.props.saveItem({itemId: itemId, title: title});
  }

  handleKeyPress(event) {
    if(event.key === 'Enter'){
      event.preventDefault();
      const {itemId, title, parentId} = this.state;
      this.props.addItem({parentId: parentId, beforeId: itemId, title: title})
      this.setState({title: ''})
      this.props.saveItem({itemId: itemId, title: ''});
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      const {itemId} = this.state;
      this.setState({isClosed: false, showMinus: true})
      this.props.openItem({itemId: itemId})
      this.props.addItem({parentId: itemId});
    } else if (event.key === 'Backspace') {
      if (event.target.value === '') {
        const {itemId} = this.state;
        this.props.deleteItem({itemId: itemId})
      }
    }
  }

  handleBlur(event) {
    event.preventDefault()
    const {itemId, title} = this.state;
    this.props.saveItem({title: title, itemId: itemId});
  }

  render() {
    const { title, isClosed, showMinus } = this.state;
    return (
      <div className='item'>
        { isClosed ? <FaPlus className='iconPlus' onClick={this.handleClick}/> : <FaMinus className={ showMinus ? 'iconMinus' : 'iconMinus visibleHidden' } onClick={this.handleClick}/> }
        <input
          type='text'
          value={title}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

const Item = connect(
    null,
    mapDispatchToProps,
)(ConnectedItem);

export default Item;
