import * as firebase from 'firebase';
import {startLoading, fetchingSuccess, fetchingRejected, updateRejected, updateSuccess, uploadImage, uploadImageRejected, uploadImageSuccess} from './statusActions';
import * as c from '../constants/userListTypes';

export function fetchAllUsers(){
  return (dispatch) => {
    dispatch(startLoading());
    const dbRef = firebase.database().ref('/users/');

    dbRef.once('value')
         .then(res => res.val())
         .then(data => {
          let users = Object.keys(data).map((key) => {
            data[key].id = key;
            return data[key];
          });

          users.sort((a, b) => {
            if (a.metadata.firstname.toLowerCase() > b.metadata.firstname.toLowerCase()) {
              return 1;
            }
            if (a.metadata.firstname.toLowerCase() < b.metadata.firstname.toLowerCase()) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

          dispatch({
            type: c.FETCH_USERS_SUCCESS,
            payload: users
          });
          dispatch(fetchingSuccess());
         })
         .catch(err => {
           dispatch(fetchingRejected(err));
         })
  };
}

export function updateUser(id, currentUser){
  return (dispatch) => {
    dispatch(startLoading());
    const dbRef = firebase.database().ref(`/users/${id}`);
    dbRef.child('/metadata')
    .update(currentUser)
    .then(() => {
      console.log(currentUser);
      dispatch(updateSuccess());
      dispatch({
        type: c.UPDATE_USER_SUCCESS,
        payload: {
          id,
          currentUser
        }
      })
    })
    .catch((e) => dispatch(updateRejected(e)));
  }
}


export function updateUserAvatar(id, avatarUpload){
  return (dispatch) => {
    dispatch(uploadImage());
    const stRef = firebase.storage().ref(`users/${id}`);
    const metadata = {
        contentType: 'image/png'
    };
    const uploadTask = stRef.child('avatar.png').put(avatarUpload.file, metadata);
    uploadTask
      .then(() => uploadFinished(dispatch, id))
      .catch((err) => dispatch(uploadImageRejected(err)));
  }
}

const uploadFinished = (dispatch, id) => {
  const dbRef = firebase.database().ref(`/users/${id}/metadata`);
  const stRef = firebase.storage().ref(`/users/${id}/avatar.png`);
  stRef.getDownloadURL()
  .then((url) =>
    dbRef.update({avatar: url})
    .then(() => url))
    .then((url) => {
      dispatch({
        type: c.UPLOAD_USER_AVATAR_SUCCESS,
        payload: {
          id,
          url
        }
      });
      dispatch(uploadImageSuccess())
  }).catch((e) => {
      this.setState({updated: 'fail'});

  });
}
