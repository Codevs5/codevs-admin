import * as c from '../constants/statusTypes.js';

export const startLoading = () => ({
    type: c.START_LOADING
});

export const fetchingRejected = (error) => ({
    type: c.FETCHING_REJECTED,
    payload : error
});

export const fetchingSuccess = () => ({
    type: c.FETCHING_SUCCESS
});

export const updateStart = () => ({
    type : c.UPDATE_START
});

export const updateRejected = (error) => ({
    type : c.UPDATE_REJECTED,
    payload: error
});

export const updateSuccess = () => ({
    type: c.UPDATE_SUCCESS
});

export const updateReset = () => ({
    type: c.UPDATE_RESET
});

export const uploadImage = () => ({
    type: c.UPLOAD_IMAGE
});

export const uploadImageRejected = (error) => ({
    type: c.UPLOAD_IMAGE_REJECTED,
    payload: error
});

export const uploadImageSuccess = () => ({
    type: c.UPLOAD_IMAGE_SUCCESS
});

export const removeSuccess = () => ({
    type: c.FETCHING_SUCCESS
});
