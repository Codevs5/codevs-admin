import { combineReducers } from 'redux';
import entry from './entryReducer';
import status from './statusReducer';

const reducers = combineReducers({
    status,
    entry
});

export default reducers;
