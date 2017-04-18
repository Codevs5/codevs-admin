import axios from 'axios';
import config from './config/urls.json';

export const getEntries = (key, pending = false, declined = false, accepted = false) =>
  axios.get(`${config.gasEntriesValidator}?key=${key}&pending=${pending}&declined=${declined}&accepted=${accepted}`)
    .then((res) => res.data)
    .then((data) => (data.message)?console.log('Error, sin acceso!'):data)
    .catch(err => console.log(err));

export const postNewReviewer = (key, payload) =>
  axios.post(`${config.gasEntriesValidator}?key=${key}`, payload)
    .then(res => console.log(res))
    .catch(err => console.log(err));

export const postUpdateReview = (key, payload) =>
  axios.post(`${config.gasEntriesValidator}?key=${key}`, payload)
    .then(res => console.log(res))
    .catch(err => console.log(err));
