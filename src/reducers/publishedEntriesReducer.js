import * as c from '../constants/publishedTypes.js';

function publishedEntries(state = [], action) {
    switch (action.type) {
        case c.FETCH_P_ENTRIES_FULLFILLED:
            return fetchEntriesFullfilled(state, action);
        case c.UPDATE_ENTRY:
            return updateEntry(state, action);
        case c.UPLOAD_IMAGE_FULLFILLED:
            return updateEntry(state, action);
        case c.ENTRY_REMOVE:
            return removeEntry(state, action.payload);
        case c.CREATE_ENTRY:
            return [
              ...state,
              action.payload
            ];            
        default:
            return state;
    }
}

//
//  Reducers function to keep clean the switch
//
function removeEntry(state, id){
  return state.filter(entry => entry.id !== id);
}
function fetchEntriesFullfilled(state, action) {
    return action.payload
}

function updateEntry(state, action) {
    return state.map(entry => updateEntryState(entry, action))

}

function updateEntryState(state, action) {
    if (state.id !== action.payload.id) {
        return state;
    }
    return Object.assign({}, state, action.payload.data);
}

export default publishedEntries;
