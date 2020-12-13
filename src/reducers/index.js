import {
  ADD_ITEM, SAVE_ITEM, CLOSE_ITEM, OPEN_ITEM, SAVE_LIST, DELETE_ITEM, SET_CHILDREN_HEIGHT, NEW_LIST, OPEN_LIST, EXPORT_LIST, UNDO_LIST, REDO_LIST,
} from '../constants/action-types';
import exportListToMarkdownByDfs from '../utils/exportListToMarkdownByDfs';

const _ = require('lodash');
const moment = require('moment');

const basicItems = {
  0: {
    title: 'Root', itemId: 0, parentId: null, children: [], isClosed: false, height: 0,
  },
  info: { fileName: 'Root', listId: 0 },
};
const lists = JSON.parse(localStorage.getItem('lists')) || {};
const listId = parseInt(localStorage.getItem('listId')) || 0;
const items = JSON.parse(JSON.stringify((lists && lists[listId]) || basicItems));

const initialState = {
  lists,
  listId,
  items,
};

let totalList = _.max(_.map(Object.keys(lists), (key) => parseInt(key))) || 0;
let totalItem = _.max(_.map(Object.keys(items), (key) => parseInt(key))) || 0;
const histories = {};
const historyIds = {};

function saveHistory(state) {
  console.log('saveHistory');
  const { listId, items } = state;
  if (!histories[listId]) {
    histories[listId] = [];
    historyIds[listId] = -1;
  }
  historyIds[listId] += 1;
  histories[listId][historyIds[listId]] = JSON.parse(JSON.stringify(items));
  histories[listId] = histories[listId].slice(0, historyIds[listId] + 1);
}

function addItem(state, payload) {
  console.log('addItem');
  saveHistory(state);
  totalItem += 1;
  const item = {
    ...payload, itemId: totalItem, children: [], isClosed: false, height: 0,
  };
  const items = { ...state.items, [totalItem]: item };
  const parent = items[item.parentId];
  if (item.beforeId) {
    const index = parent.children.findIndex((itemId) => itemId === item.beforeId);
    parent.children.splice(index, 0, item.itemId);
  } else {
    parent.children = parent.children.concat(item.itemId);
  }
  return { ...state, items };
}

function saveItem(state, payload) {
  const items = { ...state.items };
  const { itemId, title } = payload;
  if (title !== items[itemId].title) saveHistory(state);
  items[itemId].title = title;
  if (itemId == 0) {
    items.info.fileName = title;
  }
  return { ...state, items };
}

function closeItem(state, payload) {
  const items = { ...state.items };
  const { itemId } = payload;
  items[itemId].isClosed = true;
  return { ...state, items };
}

function openItem(state, payload) {
  const items = { ...state.items };
  const { itemId } = payload;
  items[itemId].isClosed = false;
  return { ...state, items };
}

function newList(state) {
  saveList(state);
  totalList += 1;
  totalItem = 0;
  const listId = totalList;
  localStorage.setItem('listId', listId);
  const items = JSON.parse(JSON.stringify(basicItems));
  items.info.listId = listId;
  saveList(state);
  console.log('newList: ', items);
  return {
    ...state,
    listId,
    items,
  };
}

function openList(state, payload) {
  saveList(state);
  const { listId } = payload;
  const items = state.lists[listId];
  localStorage.setItem('listId', listId);
  return {
    ...state,
    listId,
    items,
  };
}

function saveList(state) {
  const items = { ...state.items };
  const lists = { ...state.lists };
  lists[state.listId] = items;
  localStorage.setItem('lists', JSON.stringify(lists));
  return {
    ...state,
    lists,
    items,
  };
}

function exportList(state) {
  const items = { ...state.items };
  const result = exportListToMarkdownByDfs(items);

  const element = document.createElement('a');
  const file = new Blob([result], { type: 'text/markdown' });
  element.href = URL.createObjectURL(file);
  element.download = `${items[0].title} - ${moment().format()}.md`;
  document.body.appendChild(element);
  element.click();

  return state;
}

function undoList(state) {
  const { listId } = state;
  if (!listId || !historyIds[listId] || !histories[listId]) return state;
  console.log('undoList ', historyIds[listId]);
  const items = { ...histories[listId][historyIds[listId]] };
  historyIds[listId] -= 1;
  return { ...state, items };
}

function redoList(state) {
  const { listId } = state;
  console.log('redoList ', historyIds[listId]);
  historyIds[listId] += 1;
  if (!listId || !historyIds[listId] || !histories[listId] || !histories[listId][historyIds[listId]]) {
    historyIds[listId] -= 1;
    return state;
  }
  const items = { ...histories[listId][historyIds[listId]] };
  return { ...state, items };
}

function deleteItem(state, payload) {
  console.log('deleteItem');
  saveHistory(state);
  const items = { ...state.items };
  const { itemId } = payload;
  const item = items[itemId];
  _.remove(items[item.parentId].children, (child) => child === itemId);
  _.each(items[itemId].children, (childId) => { delete items[childId]; });
  delete items[itemId];
  return { ...state, items };
}

function setChildrenHeight(state, payload) {
  const items = { ...state.items };
  const { itemId, height } = payload;
  items[itemId].height = height;
  return { ...state, items };
}

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ITEM) {
    return addItem(state, action.payload)
  } if (action.type === SAVE_ITEM) {
    return saveItem(state, action.payload)
  } if (action.type === CLOSE_ITEM) {
    return closeItem(state, action.payload)
  } if (action.type === OPEN_ITEM) {
    return openItem(state, action.payload)
  } if (action.type === NEW_LIST) {
    return newList(state)
  } if (action.type === OPEN_LIST) {
    return openList(state, action.payload)
  } if (action.type === SAVE_LIST) {
    return saveList(state)
  } if (action.type === EXPORT_LIST) {
    return exportList(state)
  } if (action.type === UNDO_LIST) {
    return undoList(state)
  } if (action.type === REDO_LIST) {
    return redoList(state)
  } if (action.type === DELETE_ITEM) {
    return deleteItem(state, action.payload)
  } else if (action.type === SET_CHILDREN_HEIGHT) {
    return setChildrenHeight(state, action.payload)
  } 

  return state;
}

export default rootReducer;
