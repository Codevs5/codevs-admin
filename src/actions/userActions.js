import * as firebase from 'firebase';

import * as sc from '../constants/statusTypes.js';
import * as uc from '../constants/userTypes.js';
import {startLoading, updateRejected} from './statusActions.js';

export const userLogout = () => (dispatch) => {
        dispatch({type: sc.LOG_OUT});
        dispatch({type: uc.USER_LOGOUT});
}

export const userLogged = (user) => (dispatch) => {
        dispatch({type: sc.LOG_IN});
        dispatch({type: uc.USER_LOGIN, payload: user})
}

export const startLogging = (email, password) => (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => dispatch(userLogged(user)))
          .catch(err => {
            dispatch(updateRejected(err));
            dispatch(userLogout());
          });
};
