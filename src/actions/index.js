import { ADD_ITEM, SAVE_ITEM, CLOSE_ITEM, OPEN_ITEM, NEW_LIST, OPEN_LIST, SAVE_LIST, EXPORT_LIST, UNDO_LIST, REDO_LIST, DELETE_ITEM, SET_CHILDREN_HEIGHT } from '../constants/action-types';

export function addItem(payload) {
  return { type: ADD_ITEM, payload };
}

export function saveItem(payload) {
  return { type: SAVE_ITEM, payload };
}

export function closeItem(payload) {
  return { type: CLOSE_ITEM, payload };
}

export function openItem(payload) {
  return { type: OPEN_ITEM, payload };
}

export function newList(payload) {
  return {type: NEW_LIST, payload }
}

export function openList(payload) {
  return {type: OPEN_LIST, payload }
}

export function saveList(payload) {
  return { type: SAVE_LIST, payload }
}

export function exportList(payload) {
  return { type: EXPORT_LIST, payload }
}

export function deleteItem(payload) {
  return { type: DELETE_ITEM, payload }
}

export function setChildrenHeight(payload) {
  return { type: SET_CHILDREN_HEIGHT, payload }
}

export function undoList(payload) {
  return { type: UNDO_LIST, payload }
}

export function redoList(payload) {
  return { type: REDO_LIST, payload }
}
