import { ADD_ITEM, SAVE_ITEM, CLOSE_ITEM, OPEN_ITEM, SAVE_LIST, DELETE_ITEM, SET_CHILDREN_HEIGHT } from '../constants/action-types';
var _ = require('lodash');

const basicItems = {0: {title: 'Root', itemId: 0, parentId: null, children: [], isClosed: false, height: 0}}
const lists = JSON.parse(localStorage.getItem('lists')) || {};
const listId = parseInt(localStorage.getItem('listId')) || 0;
const items = (lists && lists[listId]) || basicItems

const initialState = {
  lists:  lists,
  listId: listId,
  items: items,
};

let totalItem = Object.keys(items).length;

function addItem(state, payload) {
  totalItem += 1
  let item = Object.assign({}, payload, {itemId: totalItem, children: [], isClosed: false, height: 0})
  let items = Object.assign({}, state.items, {[totalItem]: item})
  let parent = items[item.parentId]
  if (item.beforeId) {
    let index = parent.children.findIndex( itemId => {
      return itemId === item.beforeId;
    });
    parent.children.splice(index, 0, item.itemId);
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

function saveList(state, payload) {
  let items = Object.assign({}, state.items)
  let lists = Object.assign({}, state.lists)
  lists[state.listId] = items;
  localStorage.setItem('lists', JSON.stringify(lists));
  return Object.assign({}, state, {
    lists: lists,
    items: items
  });
}

function deleteItem(state, payload) {
  console.log('deleteItem')
  let items = Object.assign({}, state.items)
  let {itemId} = payload
  let item = items[itemId]
  _.remove(items[item.parentId].children, child => child === itemId)
  _.each(items[itemId].children, function(childId){ delete items[childId] })
  delete items[itemId]
  return Object.assign({}, state, {
    items: items
  });
}

function setChildrenHeight(state, payload) {
  let items = Object.assign({}, state.items)
  let {itemId, height} = payload
  items[itemId].height = height
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
  } else if (action.type === SAVE_LIST) {
    return saveList(state, action.payload)
  } else if (action.type === DELETE_ITEM) {
    return deleteItem(state, action.payload)
  } else if (action.type === SET_CHILDREN_HEIGHT) {
    return setChildrenHeight(state, action.payload)
  } 

  return state;
}

export default rootReducer;
