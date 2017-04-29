import { combineReducers } from 'redux';
import publishedEntries from './publishedEntriesReducer.js';
import validatorEntries from './validatorEntriesReducer.js';
import status from './statusReducer.js';
import user from './userReducer.js';

const reducers = combineReducers({
    publishedEntries,
    validatorEntries,
    status,
    user
});

export default reducers;
