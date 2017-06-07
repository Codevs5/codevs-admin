import * as c from '../constants/statusTypes';

const reducer = (state = {
  loading: false,
  saving: false,
  error: false,
  errorMsg: ''
}, action) => {
  switch (action.type) {
    case c.FETCH_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
        errorMsg: action.payload
      };
    case c.FETCH_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false
      };
    case c.START_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case c.END_LOADING:
      return {
        ...state,
        loading: false,
        error: false
      };
    default:
      return state;
  }
};

export default reducer;
