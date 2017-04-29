import * as firebase from 'firebase';

import * as c from '../constants/validatorEntriesTypes.js';
import {startLoading, fetchingRejected, fetchingSuccess, updateRejected, updateSuccess} from './statusActions.js';
import {getEntries, postUpdateReview} from '../utils/validatorEntriesData.js';

export const getValidatorEntries = (uid) => (dispatch) => {

    const dbRef = firebase.database().ref(`/admins/${uid}`);
    dispatch(startLoading());
    dbRef.once('value')
    .then(snap => snap.val())
    .then(data => getEntries(data.key, true, true, true))
    .then(res => updateStateEntries(res, dispatch))
    .catch(err => fetchingRejected(err));
}

const updateStateEntries = (data, dispatch) => {
    dispatch(fetchingSuccess());
    dispatch({
        type: c.FETCHED_VALIDATOR_COMPLETED,
        payload: [
            ...data.pending || [],
            ...data.accepted || [],
            ...data.declined || []
        ]
    });
}

export const changeReview = (uid, payload) => (dispatch) => {
  const dbRef = firebase.database().ref(`/admins/${uid}`);
  dispatch(startLoading());

  dbRef.once('value')
    .then(snap => snap.val())
    .then(data => postUpdateReview(data.key, payload))
    .then(res => {
      console.log('res', res);
      dispatch(updateSuccess());
      dispatch({
        type: c.UPDATE_REVIEWER_SUCCESS,
        payload: res
      })
  })
  .catch((err) => updateRejected(err));
};
