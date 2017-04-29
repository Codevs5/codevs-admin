import * as firebase from 'firebase';
import {startLoading, fetchingSuccess, fetchingRejected} from './statusActions';
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
