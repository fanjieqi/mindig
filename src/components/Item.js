import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addItem, saveItem} from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    addItem: (item) => dispatch(addItem(item)),
    saveItem: (item) => dispatch(saveItem(item)),
  };
}

class ConnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      itemId: props.itemId,
      parentId: props.parentId,
      isSaved: false,
      keysPress: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    this.setState({title: event.target.value, isSaved: false});
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      const {itemId, title, isSaved, parentId} = this.state;
      if (isSaved) {
        this.props.addItem({parentId: parentId})
      } else {
        this.setState({isSaved: true})
        this.props.saveItem({title: title, itemId: itemId});
      }
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const {itemId} = this.state;
      this.props.addItem({parentId: itemId});
    }
  }

  handleBlur = (event) => {
    event.preventDefault()
    const {itemId, title} = this.state;
    this.setState({isSaved: true})
    this.props.saveItem({title: title, itemId: itemId});
  }

  render() {
    const {title} = this.state;
    return (
      <input
        type="text"
        value={title}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
      />
    );
  }
}

const Item = connect(
    null,
    mapDispatchToProps,
)(ConnectedItem);

export default Item;
