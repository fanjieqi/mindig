import React, {Component} from 'react';
var _ = require('lodash');

const InputHeight = 27.6;
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
    const height = items[itemId].height;
    let offset = 0;
    if (items[itemId].children && !items[itemId].isClosed) {
      return (
        <div className='connectLine' style={{width: `${WIDTH}px`, height: `${height}px`}}>
          <svg >
            {_.map(items[itemId].children, (childId) => {
              let childrenHeight = items[childId].height
              childrenHeight = InputHeight > childrenHeight ? InputHeight : childrenHeight
              offset += childrenHeight;
              const targetHeight = offset - childrenHeight / 2
              return (
                <path d={`M ${0},${height / 2} C ${WIDTH/2},${height / 2} ${WIDTH/2},${targetHeight} ${WIDTH},${targetHeight}`} key={`line_${itemId}_${childId}`} fill='none' stroke=' #563d7c' strokeWidth={5} strokeLinecap='round'/>
              )
            })}
          </svg>
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default Line;
