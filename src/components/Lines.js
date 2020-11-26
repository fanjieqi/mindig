import React, {Component} from 'react';

const InputHeight = 23.8;
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
    const { items, length } = this.props;
    const height = this.props.height
    let offset = 0;
    if (length > 0) {
      return (
        <div className='connectLine' style={{width: `${WIDTH}px`, height: `${height}px`}}>
          <svg >
            {[...Array(length)].map((_, index) => {
              const childrenHeight = items[items[itemId].children[index]].height
              offset += childrenHeight;
              const targetHeight = offset - childrenHeight / 2
              return (
                <path d={`M ${0},${height / 2} C ${WIDTH/2},${height / 2} ${0},${targetHeight} ${WIDTH},${targetHeight}`} key={`line_${itemId}_${index}`} fill="none" stroke="green" strokeWidth={5}/>
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
