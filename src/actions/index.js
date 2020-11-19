import { ADD_ITEM, SAVE_ITEM, CLOSE_ITEM, OPEN_ITEM, SAVE_ITEMS, DELETE_ITEM } from '../constants/action-types';

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

export function saveItems(payload) {
  return { type: SAVE_ITEMS, payload }
}

export function deleteItem(payload) {
  return { type: DELETE_ITEM, payload }
}
