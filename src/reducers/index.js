import { combineReducers } from 'redux';
import publishedEntries from './publishedEntriesReducer.js';
import status from './statusReducer.js';

const reducers = combineReducers({
    publishedEntries,
    status
});

export default reducers;
