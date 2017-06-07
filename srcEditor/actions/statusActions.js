import * as c from '../constants/statusTypes';

export const startLoading = () => ({
  type: c.START_LOADING
});

export const endLoading = () => ({
  type: c.END_LOADING
});

export const errorFetching = (err) => ({
  type: c.FETCH_FAIL,
  payload: err
});

export const successFetching = () => ({
  type: c.FETCH_SUCCESS
});
