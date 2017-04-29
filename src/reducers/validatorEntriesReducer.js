import * as c from '../constants/validatorEntriesTypes.js';

export default  function validatorEntries (state = [], action) {

    switch (action.type) {
        case c.FETCHED_VALIDATOR_COMPLETED:
          return action.payload;
          case c.UPDATE_REVIEWER_SUCCESS:
          return state.map(entry => updateValidatorEntry(entry, action.payload))
        default:
            return state;
    }
}

const updateValidatorEntry = (entry, payload) => {
  if(entry.url !== payload.url){
    return entry;
  }
  return payload;
}
