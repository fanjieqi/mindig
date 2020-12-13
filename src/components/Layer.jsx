/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Item from './Item';
import Lines from './Lines';
import { setChildrenHeight } from '../actions/index';

const _ = require('lodash');

function mapDispatchToProps(dispatch) {
  return {
    setChildrenHeight: (item) => dispatch(setChildrenHeight(item)),
  };
}

class ConnectedLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.itemId,
    };
    this.childrenRef = React.createRef();
  }

  componentDidMount() {
    this.getRectsInterval = setInterval(() => {
      if (this.childrenRef === null || this.childrenRef.current === null) return;
      const { height } = this.childrenRef.current.getBoundingClientRect();
      const { itemId, height: oldHeight } = this.state;
      if (height !== oldHeight) {
        this.setState({ height });
        this.props.setChildrenHeight({ itemId, height });
      }
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.getRectsInterval);
  }

  render() {
    const { itemId } = this.state;
    const { items } = this.props;
    return (
      <li className={`layer item${itemId}`} key={`printItem${itemId}`}>
        <div>
          <Item
            itemId={itemId}
            title={items[itemId].title}
            parentId={items[itemId].parentId}
            showMinus={items[itemId].showMinus}
          />
        </div>
        <Lines items={items} itemId={itemId} />
        <div className={`childrenLayer ${items[itemId].isClosed ? 'closed' : 'opened'}`} key={`childrenLayer${itemId}`} ref={this.childrenRef}>
          <ul>
            {_.map(items[itemId].children, (childId) => (
              <Layer items={items} itemId={childId} parentId={itemId} key={childId} />
            ))}
          </ul>
        </div>
      </li>
    );
  }
}

ConnectedLayer.propTypes = {
  itemId: PropTypes.number.isRequired,
};

const Layer = connect(null, mapDispatchToProps)(ConnectedLayer);

export default Layer;
