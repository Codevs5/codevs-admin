function publishedEntries(state = {
    entries: [],
    fetching: false,
    fetched: false,
    error: false,
    loadingImage: false,
    alert: 0

}, action) {
    switch (action.type) {
        case 'FETCH_P_ENTRIES':
            return fetchEntries(state);
        case 'FETCH_P_ENTRIES_REJECTED':
            return fetchEntriesRejected(state, action);
        case 'FETCH_P_ENTRIES_FULLFILLED':
            return fetchEntriesFullfilled(state, action);
        case 'UPDATE_ENTRY':
            return updateEntry(state, action);
        case 'UPDATE_ENTRY_REJECTED':
            return updateEntryRejected(state, action);
        case 'UPLOAD_IMAGE':
            return uploadingImage(state, action);
        case 'UPLOAD_IMAGE_FULLFILLED':
            return uploadingImageFullfilled(state, action);
        case 'UPLOAD_IMAGE_REJECTED':
            return uploadingImageRejected(state, action);
        default:
            return state;
    }
}

//
//  Reducers function to keep clean the switch
//
function fetchEntries(state) {
    return {
        ...state,
        fetching: true
    }
}

function fetchEntriesRejected(state, action) {
    return {
        ...state,
        fetching: false,
        error: action.payload
    }
}

function fetchEntriesFullfilled(state, action) {
    return {
        ...state,
        fetching: false,
        fetched: true,
        entries: action.payload
    }
}

function updateEntry(state, action) {
    return {
        ...state,
        entries: state.entries.map(entry => updateEntryState(entry, action))
    };
}

function updateEntryRejected(state, action) {
    return {
        ...state,
        alert: -1
    };
}

function updateEntryState(state, action){
  if(state.id !== action.payload.id){
    return state;
  }
  return Object.assign({}, state, action.payload.data);
}

function uploadingImage(state, action){
  return {
    ...state,
    loadingImage: true
  }
}

function uploadingImageFullfilled(state, action){
  return {
    ...state,
    loadingImage: false,
    alert: 0,
    entries : state.entries.map(entry => updateEntryState(entry, action))
  }
}

function uploadingImageRejected(state, action){
  return {
    alert: -1,
    loadingImage: false
  }
}

export default publishedEntries;
