import * as firebase from 'firebase';
import {
  startLoading,
  fetchingSuccess,
  fetchingRejected,
  updateSuccess,
  updateRejected,
  uploadImage as uploadImageAction,
  uploadImageRejected,
  uploadImageSuccess
} from './statusActions.js';
import * as c from '../constants/publishedTypes.js';
import {ipcRenderer} from 'electron';

/**
 * Retrieve all entries from database.
 */
export const fetchEntries = () => (dispatch) => {
  dispatch(startLoading());

  const dbRef = firebase.database().ref('entries').child('info');

  dbRef.orderByChild('date')
    .once('value')
    .then(snap => snap.val())
    .then((data) => entriesParser(data))
    .then((items) => dispatch({type: 'FETCH_P_ENTRIES_FULLFILLED', payload: items}))
    .then(() => dispatch(fetchingSuccess()))
    .catch(err => dispatch(fetchingRejected(err)));
};

/**
 * For each entries it returns the entry content with the id as an array
 * of objects.
 * @param  {[Object]} data [JSON with all the entries]
 * @return {[Array]}      [Parsed array with the entries]
 */
const entriesParser = (data) => Object.keys(data).map((key, i) => ({
  ...data[key],
  id: key
}));

/**
 * Function to update the entry info
 * @param  {[String]} id   [Entry id]
 * @param  {[Object]} data [Object with the content to update]
 * @return {[Promise]}
 */
export const updateEntry = (id, data) => (dispatch) => {
  const dbRef = firebase.database().ref('entries').child('info').child(id);
  dbRef.update(data)
    .then(() => updateEntryAction(id, data))
    .then(() => dispatch(updateSuccess()))
    .catch((err) => dispatch(updateRejected(err)));
};

/*
 * Action to update the entry
 */
const updateEntryAction = (id, data) => ({
  type: c.UPDATE_ENTRY,
  payload: {
    id,
    data
  }
});

/**
 * Function to handle the upload of the image
 * @param  {[String]} id   [Entry id]
 * @param  {[File]} file [File with the image]
 *
 */
export const uploadImage = (id, file) => (dispatch) => {
  dispatch(uploadImageAction());
  let reader = new FileReader();

  reader.onloadend = () => {
    const mainImgUpload = {
      file: file,
      imagePreviewUrl: reader.result
    };
    startUpload(dispatch, mainImgUpload, id);
  };
  reader.readAsDataURL(file);
};

/**
 * Function to upload the image to firebase's bucket
 */
const startUpload = (dispatch, mainImgUpload, id) => {
  const stRef = firebase.storage().ref('entries').child(id);
  const metadata = { contentType: 'image/png' };
  //Main.png is always the name of the entries header pic.
  const uploadTask = stRef.child('main.png').put(mainImgUpload.file, metadata);
  uploadTask
    .then(() => uploadFinished(id, dispatch))
    .catch((err) => dispatch(uploadImageRejected(err)));
};

/**
 * Function to add the image url in the database object
 * @param  {[String]} id       [Entry id]
 * @param  {[Function]} dispatch
 * @return {[Promise]}
 */
const uploadFinished = (id, dispatch) => {
  const dbRef = firebase.database().ref('entries').child('info').child(id);
  const stRef = firebase.storage().ref('entries').child(id).child('main.png');

  stRef.getDownloadURL()
    .then((url) => dbRef.update({imgSrc: url}))
    .then(() => url)
    .then((url) => dispatch(uploadImageFullfilled(url)))
    .then(() => uploadImageSuccess())
    .catch((err) => uploadImageRejected(err));
};

/*
 * Action to add the image url
 */
const uploadImageFullfilled = (url) => ({
  type: c.UPLOAD_IMAGE_FULLFILLED,
  payload: {
    data: url
  }
});

/**
 * Delete the entry from the database
 * @param  {[String]} id      [Entry id]
 * @param  {[Object]} history
 * @return {[Promise]}
 */
export const deleteEntry = (id, history) => (dispatch) => {
  dispatch(startLoading());

  const dbRefInfo = firebase.database().ref('entries').child('info').child(id);
  const dbRefContent = firebase.database().ref('entries').child('content').child(id);

  dbRefInfo.remove()
    .then(() => dbRefContent.remove())
    .then(() => dispatch(entryRemove(id)))
    .then(() => history.goBack())
    .then(() => dispatch(removeSuccess()))
    .catch((err) => dispatch(updateRejected(err)));
};

/*
 * Action to remove the entry from the state
 */
const entryRemove = (id) => ({
  type: c.ENTRY_REMOVE,
  payload: id
});


/**
 * Create new empty entry
 * @return {[Promise]}
 */
export const createEntry = () => (dispatch) => {

  dispatch(startLoading());
  const user = firebase.auth().currentUser.uid;
  const dbRefInfo = firebase.database().ref('entries').child('info');
  const dbUser = firebase.database().ref('users').child(user);

  dbUser.once('value')
    .then((snap) => snap.val())
    .then((data) => {
      const entryInfo = {
        author: {
          name: data.metadata.firstname,
          id: user
        },
        pinned: false,
        visible: false,
        date: new Date(),
        title: 'No title :('
      };
      const key = dbRefInfo.push(entryInfo).key;
      ipcRenderer.send('loadNewWin', {id: key});
      dispatch(addEntry({...entryInfo, id: key}));
    })
    .then(() => dispatch(endLoading()));
};

/*
 * Action to add new entry to the state
 */
const addEntry = (entry) => ({
  type: c.CREATE_ENTRY,
  payload: entry
});
