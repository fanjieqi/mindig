import React, {Component} from 'react';

const InputHeight = 23.8;

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.itemId,
    };
  }

  render() {
    const { itemId } = this.state;
    const { length } = this.props;
    const height = length * InputHeight;
    const width = 100;
    if (length > 0) {
      return (
        <div className='connectLine' style={{width: `${width}px`, height: `${height}px`}}>
          <svg >
            {[...Array(length)].map((_, index) => (
              <path d={`M ${0},${height / 2} C ${width/2},${height / 2} ${0},${(index + 0.5) *InputHeight} ${width},${(index + 0.5) *InputHeight}`} key={`line_${itemId}_${index}`} fill="none" stroke="green" strokeWidth={5}/>
            ))}
          </svg>
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default Line;
