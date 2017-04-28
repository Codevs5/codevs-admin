import * as c from '../constants/statusTypes.js';

export function startLoading(){
  return {
    type: c.START_LOADING
  };
}

export function fetchingRejected(error){
  return {
    type: c.FETCHING_REJECTED,
    payload : error
  };
}

export function fetchingSuccess(){
  return {
    type: c.FETCHING_SUCCESS
  };
}

export function updateStart(){
  return {
    type : c.UPDATE_START
  };
}

export function updateRejected(error){
  return {
    type : c.UPDATE_REJECTED,
    payload: error
  };
}

export function updateSuccess(){
  return {
    type: c.UPDATE_SUCCESS
  };
}

export function uploadImage(){
  return {
    type: c.UPLOAD_IMAGE
  };
}

export function uploadImageRejected(error){
  return {
    type: c.UPLOAD_IMAGE_REJECTED,
    payload: error
  };
}

export function uploadImageSuccess(){
  return {
    type: c.UPLOAD_IMAGE_SUCCESS
  };
}
