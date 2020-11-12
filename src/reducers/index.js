import { ADD_ITEM, SAVE_ITEM, CLOSE_ITEM, OPEN_ITEM } from '../constants/action-types';

const initialState = {
  items: {0: {title: 'Root', itemId: 0, parentId: null, children: [], isClosed: false}},
};

let totalItem = 0;

function addItem(state, payload) {
  totalItem += 1
  let item = Object.assign({}, payload, {itemId: totalItem, children: []})
  let items = Object.assign({}, state.items, {[totalItem]: item})
  let parent = items[item.parentId]
  if (item.afterId) {
    let index = parent.children.findIndex( itemId => {
      return itemId === item.afterId;
    });
    parent.children.splice(index+1, 0, item.itemId);
  } else {
    parent.children = parent.children.concat(item.itemId)
  }
  return Object.assign({}, state, {
    items: items
  });
}

function saveItem(state, payload) {
  let items = Object.assign({}, state.items)
  let {itemId, title} = payload
  items[itemId].title = title
  return Object.assign({}, state, {
    items: items
  });
}

function closeItem(state, payload) {
  let items = Object.assign({}, state.items)
  let {itemId} = payload
  items[itemId].isClosed = true
  return Object.assign({}, state, {
    items: items
  });
}

function openItem(state, payload) {
  let items = Object.assign({}, state.items)
  let {itemId} = payload
  items[itemId].isClosed = false
  return Object.assign({}, state, {
    items: items
  });
}

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ITEM) {
    return addItem(state, action.payload)
  } else if (action.type === SAVE_ITEM) {
    return saveItem(state, action.payload)
  } else if (action.type === CLOSE_ITEM) {
    return closeItem(state, action.payload)
  } else if (action.type === OPEN_ITEM) {
    return openItem(state, action.payload)
  }

  return state;
}

export default rootReducer;
