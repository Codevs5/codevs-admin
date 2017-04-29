import { combineReducers } from 'redux';
import publishedEntries from './publishedEntriesReducer.js';
import status from './statusReducer.js';
import user from './userReducer.js';

const reducers = combineReducers({
    publishedEntries,
    status,
    user
});

export default reducers;
