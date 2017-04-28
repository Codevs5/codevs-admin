import * as c from '../constants/loginConstans.js';

function login(state = {

}, action){
  switch (action.type) {
    case c.LOGIN_START:
      return loginStart(state, action);
    case c.LOGIN_REJECTED:
    return loginRejected(state, action);
    case c.LOGIN_FINISHED:
    return loginFinished(state, action);
    default:
      return state;
  }
}

function loginStart(state, action){

}

function loginRejected(state, action){

}

function loginFinished(state, action){

}

export default login;
