import {EditorState} from 'draft-js';
import * as c from '../constants/entryTypes';

const reducer = (state = {
  title: 'No title',
  editorState: EditorState.createEmpty(),
  id: ''
}, action) => {
  switch (action.type) {
    case c.LOAD_ENTRY:
      return action.payload;
    case c.START_ENTRY:
      return {
        ...state,
        id: action.payload
      };
    case c.FETCH_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case c.FETCH_CONTENT:
      return {
        ...state,
        editorState: action.payload
      };
    case c.UPDATE_ID:
      return {
        ...state,
        id: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
