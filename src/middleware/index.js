import { ADD_ITEM } from '../constants/action-types';

const forbiddenWords = [""];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_ITEM) {
        let { title } = action.payload;
        const foundWord = title && forbiddenWords.filter(word =>
          title.includes(word)
        );

        if (foundWord && foundWord.length) {
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      return next(action);
    };
  };
}
