/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_ITEM, SAVE_ITEM, CLOSE_ITEM, OPEN_ITEM, SAVE_LIST, DELETE_ITEM, SET_CHILDREN_HEIGHT,
  NEW_LIST, OPEN_LIST, EXPORT_LIST, UNDO_LIST, REDO_LIST, SAVE_FILES, ADD_FILE, DELETE_FILE,
} from '../constants/action-types';
import exportListToMarkdownByDfs from '../utils/exportListToMarkdownByDfs';

const _ = require('lodash');
const moment = require('moment');

const basicItems = {
  0: {
    title: 'Root', itemId: 0, parentId: null, children: [], isClosed: false, height: 0,
  },
  info: {
    fileName: 'Root', listId: 0, title: 'Root', key: null, children: [], isLeaf: true,
  },
};
const initFiles = JSON.parse(localStorage.getItem('files')) || null;
const initListIds = JSON.parse(localStorage.getItem('listIds'));
const initListId = parseInt(localStorage.getItem('listId'), 10) || uuidv4();
const initItems = JSON.parse(localStorage.getItem(`file-${initListId}`)) || JSON.parse(JSON.stringify(basicItems));

const initialState = {
  files: initFiles,
  listIds: initListIds,
  listId: initListId,
  items: initItems,
};

const histories = {};
const historyIds = {};

const process = (data, key, callback) => {
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].key === key) {
      return callback(data[i]);
    }
    if (data[i].children && data[i].children.length > 0) {
      process(data[i].children, key, callback);
    }
  }
  return null;
};

function saveHistory(state) {
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
  saveHistory(state);
  const id = uuidv4();
  const item = {
    ...payload, itemId: id, children: [], isClosed: false, height: 0,
  };
  const items = { ...state.items, [id]: item };
  const parent = items[item.parentId];
  if (item.beforeId) {
    const index = parent.children.findIndex((itemId) => itemId === item.beforeId);
    parent.children.splice(index + 1, 0, item.itemId);
  } else {
    parent.children = parent.children.concat(item.itemId);
  }
  return { ...state, items };
}

function saveItem(state, payload) {
  const items = { ...state.items };
  const files = [...state.files];
  const { listId } = state;
  const { itemId, title } = payload;
  if (title !== items[itemId].title) saveHistory(state);
  items[itemId].title = title;
  if (itemId === 0) {
    items.info.fileName = title;
    items.info.title = title;
    process(files, listId, (file) => file.title = title);
    localStorage.setItem('files', JSON.stringify(files));
  }
  return { ...state, items, files };
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

function saveList(state) {
  const { items, listId } = { ...state };
  localStorage.setItem('listId', listId);
  localStorage.setItem(`file-${listId}`, JSON.stringify(items));
  return {
    ...state,
    items,
  };
}

function newList(state) {
  saveList(state);
  const listId = uuidv4();
  localStorage.setItem('listId', listId);
  const items = JSON.parse(JSON.stringify(basicItems));
  items.info.listId = listId;
  items.info.key = listId;
  const files = [...state.files];
  files.push(items.info);
  localStorage.setItem('files', JSON.stringify(files));
  saveList(state);
  return {
    ...state,
    listId,
    items,
    files,
  };
}

function openList(state, payload) {
  saveList(state);
  const { listId } = payload;
  const items = JSON.parse(localStorage.getItem(`file-${listId}`));
  localStorage.setItem('listId', listId);
  return {
    ...state,
    listId,
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
  const items = { ...histories[listId][historyIds[listId]] };
  historyIds[listId] -= 1;
  return { ...state, items };
}

function redoList(state) {
  const { listId } = state;
  historyIds[listId] += 1;
  if (!listId || !historyIds[listId] || !histories[listId]
    || !histories[listId][historyIds[listId]]) {
    historyIds[listId] -= 1;
    return state;
  }
  const items = { ...histories[listId][historyIds[listId]] };
  return { ...state, items };
}

function deleteItem(state, payload) {
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

function saveFiles(state, payload) {
  const { files } = payload;
  localStorage.setItem('files', JSON.stringify(files));
  return {
    ...state,
    files,
  };
}

function addFile(state, payload) {
  const { key, title } = payload;
  const listId = key;
  localStorage.setItem('listId', listId);
  const items = JSON.parse(JSON.stringify(basicItems));
  items.info.listId = key;
  items.info.key = key;
  items.info.title = title;
  localStorage.setItem(`file-${listId}`, JSON.stringify(items));
  return {
    ...state,
    items,
  };
}

function deleteFolder(state, payload) {
  const { files } = state;
  const { key } = payload;
  _.remove(files, (file) => file.key === key);
  localStorage.setItem('files', JSON.stringify(files));
  return {
    ...state,
    files,
  };
}

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ITEM) {
    return addItem(state, action.payload);
  } if (action.type === SAVE_ITEM) {
    return saveItem(state, action.payload);
  } if (action.type === CLOSE_ITEM) {
    return closeItem(state, action.payload);
  } if (action.type === OPEN_ITEM) {
    return openItem(state, action.payload);
  } if (action.type === NEW_LIST) {
    return newList(state);
  } if (action.type === OPEN_LIST) {
    return openList(state, action.payload);
  } if (action.type === SAVE_LIST) {
    return saveList(state);
  } if (action.type === EXPORT_LIST) {
    return exportList(state);
  } if (action.type === UNDO_LIST) {
    return undoList(state);
  } if (action.type === REDO_LIST) {
    return redoList(state);
  } if (action.type === DELETE_ITEM) {
    return deleteItem(state, action.payload);
  } if (action.type === SET_CHILDREN_HEIGHT) {
    return setChildrenHeight(state, action.payload);
  } if (action.type === SAVE_FILES) {
    return saveFiles(state, action.payload);
  } if (action.type === ADD_FILE) {
    return addFile(state, action.payload);
  } if (action.type === DELETE_FILE) {
    return deleteFolder(state, action.payload);
  }

  return state;
}

export default rootReducer;
