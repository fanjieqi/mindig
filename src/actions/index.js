import { ADD_ITEM, SAVE_ITEM, DATA_REQUESTED } from '../constants/action-types';

export function addItem(payload) {
  return { type: ADD_ITEM, payload };
}

export function saveItem(payload) {
  return { type: SAVE_ITEM, payload };
}
