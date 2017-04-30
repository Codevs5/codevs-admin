import * as c from '../constants/userListTypes';

export default function userList(state = [], action){
  switch (action.type) {
    case c.FETCH_USERS_SUCCESS:
      return action.payload;
    case c.UPDATE_USER_SUCCESS:
      return updateUser(action.payload.id, action.payload.currentUser, state);
    case c.UPLOAD_USER_AVATAR_SUCCESS:
      return updateUserAvatar(action.payload.id, action.payload.url, state);
    case c.CREATE_USER:
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}

const updateUser = (id, current, state) => {
  return state.map((user) => {
    if(user.id !== id) return user;
    return {
      id: id,
      metadata: current
    };
  })
}

const updateUserAvatar = (id, url, state) => {
  return state.map(user => {
    if(user.id !== id) return user;
    console.log({
      ...user,
      avatar: url
    });
    return {
      ...user,
      metadata: {
        ...user.metadata,
        avatar: url
      }
    }
  })
}
