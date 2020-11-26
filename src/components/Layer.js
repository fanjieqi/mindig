import React, {Component} from 'react';
import {connect} from 'react-redux';
import Item from './Item';
import Lines from './Lines';
import {setChildrenHeight} from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    setChildrenHeight: (item) => dispatch(setChildrenHeight(item)),
  };
}

class ConnectedLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.itemId
    }
    this.childrenRef = React.createRef();
  }

  componentDidMount() {
    this.getRectsInterval = setInterval(() => {
      if (this.childrenRef == null || this.childrenRef.current == null) return
      const { height } = this.childrenRef.current.getBoundingClientRect();
      const { itemId } = this.state
      if (height !== this.state.height) {
        this.setState({height: height})
        this.props.setChildrenHeight({itemId: itemId, height: height})
      }
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.getRectsInterval);
  }

  render() {
    const {itemId} = this.state;
    const {items} = this.props;
    return (
      <li className={'layer item' + itemId } key={'printItem'+itemId} ref={this.childrenRef}>
        <div>
        <Item itemId={itemId} title={items[itemId].title} parentId={items[itemId].parentId} showMinus={items[itemId].showMinus} />
        </div>
        <Lines items={items} itemId={itemId} length={items[itemId].children.length} height={items[itemId].height} />
          <div className={`childrenLayer ${items[itemId].isClosed ? 'closed' : 'opened'}`} key={`childrenLayer${itemId}`}>
            <ul>
              {items[itemId].children.map((childId) => (
                <Layer items={items} itemId={childId} parentId={itemId} key={childId}/>
              ))}
            </ul>
          </div>
      </li>
    )
  }
}

const Layer = connect(null, mapDispatchToProps)(ConnectedLayer);

export default Layer;
