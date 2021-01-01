/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
  addItem, saveItem, closeItem, openItem, deleteItem,
} from '../actions/index';

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
      title: props.title || '',
      itemId: props.itemId,
      parentId: props.parentId,
      isClosed: props.isClosed,
      showMinus: props.showMinus,
    };
  }

  handleClick = () => {
    const { itemId, isClosed } = this.state;
    this.setState({ isClosed: !isClosed });
    if (!isClosed) {
      this.props.closeItem({ itemId });
    } else {
      this.props.openItem({ itemId });
    }
  }

  handleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const { itemId, title, parentId } = this.state;
      this.props.addItem({ parentId, beforeId: itemId, title });
      this.setState({ title: '' });
      this.props.saveItem({ itemId, title: '' });
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const { itemId } = this.state;
      this.setState({ isClosed: false, showMinus: true });
      this.props.openItem({ itemId });
      this.props.addItem({ parentId: itemId });
    } else if (event.key === 'Backspace') {
      if (event.target.value === '') {
        const { itemId } = this.state;
        this.props.deleteItem({ itemId });
      }
    }
  }

  handleBlur = (event) => {
    event.preventDefault();
    const { itemId, title } = this.state;
    this.props.saveItem({ title, itemId });
  }

  render() {
    const { title, isClosed, showMinus } = this.state;
    return (
      <div className="item">
        { isClosed ? <PlusOutlined className="iconPlus" onClick={this.handleClick} /> : <MinusOutlined className={showMinus ? 'iconMinus' : 'iconMinus visibleHidden'} onClick={this.handleClick} /> }
        <input
          type="text"
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

ConnectedItem.propTypes = {
  title: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
  parentId: PropTypes.number.isRequired,
  isClosed: PropTypes.bool.isRequired,
  showMinus: PropTypes.bool.isRequired,
};

const Item = connect(
  null,
  mapDispatchToProps,
)(ConnectedItem);

export default Item;
