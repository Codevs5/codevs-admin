import * as c from '../constants/userTypes.js';

export default function userReducer(state = null, action) {
    switch (action.type) {
        case c.USER_LOGIN:
            return action.payload.uid;
        case c.USER_LOGOUT:
            return null;
        default:
            return state;
    }
};
