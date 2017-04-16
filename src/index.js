import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './style/app.scss';

//Components
import {Login} from './components/Login';
import { AppRouter } from './routes.js';

const config = {
    apiKey: "AIzaSyCjR0rBbIEAh3NQXyCgqOCoKZ1DYOoNVMQ",
    authDomain: "codevs-test.firebaseapp.com",
    databaseURL: "https://codevs-test.firebaseio.com",
    projectId: "codevs-test",
    storageBucket: "codevs-test.appspot.com",
    messagingSenderId: "464619208597"
};

firebase.initializeApp(config);

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    handleLogin() {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;

        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

        });

    }

    handleLogout() {
        firebase.auth().signOut();
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user})
            } else {
                this.setState({user: null})
            }
        });
    }

    render() {
        if (this.state.user)
            return (
                <AppRouter handleLogout={this.handleLogout} />
            )
        return <Login handleSignUp={this.handleSignUp} handleLogin={this.handleLogin}/>;
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app'));
