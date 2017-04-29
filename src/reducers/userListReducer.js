import * as c from '../constants/userListTypes';

export default function userList(state = [], action){
  switch (action.type) {
    case c.FETCH_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
