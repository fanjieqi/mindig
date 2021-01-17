/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const _ = require('lodash');

const InputHeight = 26;
const WIDTH = 100;

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.itemId,
    };
  }

  render() {
    const { itemId } = this.state;
    const { items } = this.props;
    const { height } = items[itemId];
    let offset = 0;
    if (items[itemId].children.length && !items[itemId].isClosed) {
      return (
        <div className="connectLine" style={{ width: `${WIDTH}px` }}>
          <svg>
            {_.map(items[itemId].children, (childId) => {
              let childrenHeight = items[childId].height;
              childrenHeight = InputHeight > childrenHeight ? InputHeight : childrenHeight;
              offset += childrenHeight;
              const targetHeight = offset - childrenHeight / 2;
              return (
                <path
                  d={
                    `M ${0},
                    ${height / 2} C ${WIDTH / 2},
                    ${height / 2} ${WIDTH / 2},
                    ${targetHeight} ${WIDTH},
                    ${targetHeight}`
                  }
                  key={`line_${itemId}_${childId}`}
                  fill="none"
                  stroke=" #563d7c"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>
      );
    }
    return (null);
  }
}

Line.propTypes = {
  itemId: PropTypes.number.isRequired,
  items: PropTypes.objectOf(() => true).isRequired,
};

export default Line;
