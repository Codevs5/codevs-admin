import React, {Component} from 'react';
import * as firebase from 'firebase';
import uuid from 'node-uuid';

import NewUser from '../components/users/NewUser.js';

import {validateUser} from '../utils/validateUserProfile.js';

export default class NewUserContainer extends Component {
    constructor(props) {
        super(props);
        this.roles = ['admin', 'user'];

        this.state = {
            name: '',
            lastname: '',
            role: this.roles[0],
            email: '',
            password: '',
            pwdVisibility: false,
            loading: false,
            error: false,
            updated: ''
        }

        this.handleNewUser = this.handleNewUser.bind(this);
        this.createUserProfile = this.createUserProfile.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.setUserRole = this.setUserRole.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordVisibility = this.handlePasswordVisibility.bind(this);
    }

    createUserProfile(user) {
        const dbRef = firebase.database().ref('users');
        const newUser = {};
        newUser[user.uid] = {
            metadata: {
                bio: '',
                firstname: this.state.name,
                lastname: this.state.lastname,
                social: {},
                isAdmin: (this.state.role === this.roles[0])
            }
        };
        return user.updateProfile({photoURL: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'})
          .then(() => dbRef.update(newUser))
          .then(res => this.setUserRole(user, this.state.role));

    }

    setUserRole(user) {
        const dbRef = firebase.database().ref('admins');
        const newUser = {};
        newUser[user.uid] = {
            googleName: this.state.name,
            key: uuid.v4()
        };
        if (this.state.role !== 'admin') {
            return Promise.resolve();
        } else {
            return dbRef.update(newUser)
                    .then(()=> user);
        }
    }

    createNewUser() {
        const config = {
            apiKey: "AIzaSyCjR0rBbIEAh3NQXyCgqOCoKZ1DYOoNVMQ",
            authDomain: "codevs-test.firebaseapp.com",
            databaseURL: "https://codevs-test.firebaseio.com",
            projectId: "codevs-test",
            storageBucket: "codevs-test.appspot.com",
            messagingSenderId: "464619208597"
        };
        this.setState({loading: true});
        const secondaryAuth = firebase.initializeApp(config, "secondary");
        secondaryAuth.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(user => this.createUserProfile(user))
          //.then(() => secondaryAuth.auth().signOut())
          //.then(user => user.link(new firebase.auth.GoogleAuthProvider()))
          .then(() => this.setState({error: false, loading: false, updated: 'updated'}))
          .catch(err => {
            console.log(err);
            this.setState({error: true, loading: false, updated: 'fail'});
          });
    }

    handleNewUser() {
        if (validateUser(this.state))
            this.createNewUser();
        else
            this.setState({updated: 'fail'})
        }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleLastnameChange(e) {
        this.setState({lastname: e.target.value});
    }

    handleRoleChange(e) {
      console.log(e.target.value);
        this.setState({role: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handlePasswordVisibility() {
        this.setState({
            pwdVisibility: !this.state.pwdVisibility
        });
    }

    render() {

        return (<NewUser
            handleNewUser={this.handleNewUser}
            handleNameChange={this.handleNameChange}
            handleLastnameChange={this.handleLastnameChange}
            handleRoleChange={this.handleRoleChange}
            handleEmailChange={this.handleEmailChange}
            handlePasswordChange={this.handlePasswordChange}
            handlePasswordVisibility={this.handlePasswordVisibility}
            roles={this.roles}
            values={this.state}
            currentRole={this.state.role}
            loading={this.state.loading}
            error={this.state.error}
            updated={this.state.updated}
          />);
    }
}
