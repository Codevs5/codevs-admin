import * as firebase from 'firebase';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import * as c from '../constants/entryTypes';
import { startLoading, endLoading, errorFetching, successFetching } from './statusActions';
import store from '../store';


export const startEntry = (id) => (dispatch) => {
  if(id.length >= 0){
    dispatch(updateID(id));
    return dispatch(fetchEntry(id));
  }
  return dispatch(errorFetching('Invalid id!'));
}

export const updateID = (id) => {
  return {
    type: c.UPDATE_ID,
    payload: id
  };
};

export const fetchEntry = (id) => (dispatch) => {
  const dbRefEntries = firebase.database().ref('entries');

  const dbRefInfo = dbRefEntries.child('info').child(id);
  const dbRefContent = dbRefEntries.child('content').child(id);

  //Get title
  dbRefInfo.on('value', (snap) => {
    const data = snap.val();
    const title = data.title || 'Sin título';
    dispatch(fetchTitle(title))
  });

  dbRefContent.once('value')
  .then((snap) => snap.val())
  .then(data => {
    if(data.content){
      dispatch(updateEditor(data.content));
    }
  });
};

export const fetchTitle = (title) => ({
  type: c.FETCH_TITLE,
  payload: title,
});

export const updateEditor = (content) => (dispatch) => {
  const blocksFromHTML = convertFromHTML(content);
  const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap,
        );
  const editorState = EditorState.createWithContent(contentState);

  return dispatch(onChangeEditor(editorState));
};

export const saveTitle = (id, title) => (dispatch) => {
  dispatch(startLoading());
  //TODO: Gestionar error al guardar
  const dbRef = firebase.database().ref('entries').child('info').child(id);

  dbRef
    .update({title})
    .then(() => dispatch(endLoading()));
};

export const saveEntry = (currentState) => (dispatch) => {
  dispatch(startLoading());
  //TODO: Gestionar error al guardar
  const entry = store.getState().entry;
  const editor = currentState.getCurrentContent();
  const id = entry.id;

  const dbRef = firebase.database().ref('entries').child('content');
  let data = {};
  data[id] = {content: stateToHTML(editor)};
  dbRef
    .update(data)
    .then(() => dispatch(endLoading()))
  console.log(data);

};

export const onChangeEditor = (editor) => ({
  type: c.FETCH_CONTENT,
  payload: editor
});
