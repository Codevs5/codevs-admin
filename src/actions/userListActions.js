import * as firebase from 'firebase';
import {
  startLoading,
  fetchingSuccess,
  fetchingRejected,
  updateRejected,
  updateSuccess,
  uploadImage,
  uploadImageRejected,
  uploadImageSuccess
} from './statusActions';
import * as c from '../constants/userListTypes';
import {secondaryAuth} from '../index.js';
import {validateUser} from '../utils/validateUserProfile.js';
import uuid from 'node-uuid';

/**
 * Retrieve all users from the database
 * @return {[Promise]}
 */
export const fetchAllUsers = () => (dispatch) => {
  dispatch(startLoading());
  const dbRef = firebase.database().ref('users');

  dbRef.once('value').then(res => res.val()).then(data => {
    let users = Object.keys(data).map((key) => {
      data[key].id = key;
      return data[key];
    });
    users.sort(sortUsers);
    dispatch({type: c.FETCH_USERS_SUCCESS, payload: users});
    dispatch(fetchingSuccess());
  }).catch(err => dispatch(fetchingRejected(err)))
};

/*
 * Function to sort the users by name
 */
const sortUsers = (a, b) => {
  if (a.metadata.firstname.toLowerCase() > b.metadata.firstname.toLowerCase()) {
    return 1;
  }
  if (a.metadata.firstname.toLowerCase() < b.metadata.firstname.toLowerCase()) {
    return -1;
  }
  // a must be equal to b
  return 0;
};

/**
 * Update the currente User
 * @param  {[String]} id          [User id]
 * @param  {[Object]} currentUser [Firebase User]
 * @return {[Promise]}
 */
export const updateUser = (id, currentUser) => (dispatch) => {
  dispatch(startLoading());
  const dbRef = firebase.database().ref('users').child(id).child('metadata');

  dbRef.update(currentUser)
    .then(() => dispatch(updateUserSuccess(id, currentUser)))
    .then(() => dispatch(updateSuccess()))
    .catch((err) => dispatch(updateRejected(err)));
}

/*
 * Action to update the user
 */
const updateUserSuccess = (id, currentUser) => ({
  type: c.UPDATE_USER_SUCCESS,
  payload: {
    id,
    currentUser
  }
});

/**
 * Function to upload user's avatar to firebase bucket
 * @param  {[String]} id           [User id]
 * @param  {[File]} avatarUpload [File with the image]
 * @return {[Promise]}
 */
export const updateUserAvatar = (id, avatarUpload) => (dispatch) => {
  dispatch(uploadImage());
  const stRef = firebase.storage().ref('users').child(id);
  const metadata = {
    contentType: 'image/png'
  };
  const uploadTask = stRef.child('avatar.png').put(avatarUpload.file, metadata);
  uploadTask
    .then(() => uploadFinished(dispatch, id))
    .catch((err) => dispatch(uploadImageRejected(err)));
}

/*
 * Function to insert avatar url into the user object
 */
const uploadFinished = (dispatch, id) => {
  const dbRef = firebase.database().ref('users').child(id).child('metadata');
  const stRef = firebase.storage().ref('users').child(id).child('avatar.png');

  stRef.getDownloadURL()
    .then((url) => dbRef.update({avatar: url})
    .then(() => url))
    .then((url) => dispatch(uploadUserAvatar(id, url)))
    .then(() => dispatch(uploadImageSuccess()))
    .catch((err) => dispatch(uploadImageRejected(err)));

};

/*
 * Action to add user avatar url
 */
const uploadUserAvatar = (id, url) => ({
  type: c.UPLOAD_USER_AVATAR_SUCCESS,
  payload: {
    id,
    url
  }
});

/**
 * Functio to create new user with the given data
 * @param {[Object]} data
 */
export const addNewUser = (data) => (dispatch) => {
  if (validateUser(data))
    createNewUser(data, dispatch);
  else
    dispatch(updateRejected());
  }

/*
 * If user has correct parameters this function will
 * create the new user.
 */
const createNewUser = (data, dispatch) => {
  dispatch(startLoading());

  secondaryAuth.auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(user => createUserProfile(user, data, dispatch))
    .then((userPayload) => dispatch(createUserAction(userPayload, user.uid)))
    .then(() => dispatch(updateSuccess()))
    .catch((err) => dispatch(updateRejected(err)));

};

/*
 * Action to add the new user to the state
 */
const createUserAction = (data, id) => ({
  type: c.CREATE_USER,
  payload: {
    ...data,
    id: id
  }
});

/**
 * Function to create the new user profile
 * @param  {[Object]} user     [Firebase.user]
 * @param  {[Object]} data     [Object with the user's profile attributes]
 * @param  {[Function]} dispatch
 * @return {[Promise]}
 */
const createUserProfile = (user, data, dispatch) => {

  const dbRef = firebase.database().ref('users');
  const newUser = {};
  newUser[user.uid] = {
    metadata: {
      firstname: data.name,
      lastname: data.lastname,
      isAdmin: (data.role === 'admin'),
      avatar: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
    }
  };

  return dbRef
    .update(newUser)
    .then(res => setUserRole(user, newUser[user.uid]));

};

/**
 * Function to create the user privates (only for admins) profile
 * @param {[Object]} user        [Firebase.user]
 * @param {[Object]} data        [User metadata]
 * @return {[Promise]}
 */
const setUserRole = (user, data) => {

  const dbRef = firebase.database().ref('admins');
  const newUser = {};

  newUser[user.uid] = {
    key: uuid.v4()
  };

  if (!data.metadata.isAdmin) {
    return Promise.resolve(data);
  } else {
    return dbRef.update(newUser).then(() => data);
  }
}
