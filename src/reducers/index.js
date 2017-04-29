import { combineReducers } from 'redux';
import publishedEntries from './publishedEntriesReducer.js';
import validatorEntries from './validatorEntriesReducer.js';
import status from './statusReducer.js';
import user from './userReducer.js';
import userList from './userListReducer.js';

const reducers = combineReducers({
    publishedEntries,
    validatorEntries,
    status,
    user,
    userList
});

export default reducers;
