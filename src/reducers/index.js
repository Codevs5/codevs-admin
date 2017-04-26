import { combineReducers } from 'redux';
import publishedEntries from './publishedEntriesReducer.js';

const reducers = combineReducers({
    publishedEntries,
});

export default reducers;
