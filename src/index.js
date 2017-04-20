import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './style/app.scss';

import AppContainer from './containers/AppContainer.js';

const config = {
    apiKey: "AIzaSyCjR0rBbIEAh3NQXyCgqOCoKZ1DYOoNVMQ",
    authDomain: "codevs-test.firebaseapp.com",
    databaseURL: "https://codevs-test.firebaseio.com",
    projectId: "codevs-test",
    storageBucket: "codevs-test.appspot.com",
    messagingSenderId: "464619208597"
};

firebase.initializeApp(config);

ReactDOM.render(
    <AppContainer />, document.getElementById('app'));
