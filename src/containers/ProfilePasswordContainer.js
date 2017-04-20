import React, {Component} from 'react';
import * as firebase from 'firebase';

import ProfilePassword from '../components/profile/ProfilePassword.js';
import {validatePassword} from '../utils/validateUserProfile.js';

export default class ProfilePasswordContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: {
                password: '',
                password2: '',
                current: ''
            },
            visibility: false,
            validPassword: false,
            updated: ''
        };

        this.handleChangePassword1 = this.handleChangePassword1.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
        this.handleChangeVisibility = this.handleChangeVisibility.bind(this);
        this.handleChangeCurrentPassword = this.handleChangeCurrentPassword.bind(this);

    }

    handleChangePassword1(e) {

        const tmpPwd = Object.assign({}, this.state.pwd, {password: e.target.value});

        if (e.target.value === this.state.pwd.password2)
            this.setState({validPassword: true});
        else
            this.setState({validPassword: false});

        this.setState({pwd: tmpPwd});
    }

    handleChangePassword2(e) {
        if (e.target.value === this.state.pwd.password)
            this.setState({validPassword: true});
        else
            this.setState({validPassword: false});

        const tmpPwd = Object.assign({}, this.state.pwd, {password2: e.target.value});
        this.setState({pwd: tmpPwd});
    }

    handleChangeCurrentPassword(e) {
        const tmpPwd = Object.assign({}, this.state.pwd, {current: e.target.value});
        this.setState({pwd: tmpPwd});
    }

    handleUpdatePassword() {
        const user = firebase.auth().currentUser;
        console.log(user);
        if (this.state.validPassword && validatePassword(this.state.pwd.password)) {
            const credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.pwd.current);
            user.reauthenticate(credential)
                .then(() => user.updatePassword(this.state.pwd.password))
                .then(() => this.setState({updated: 'updated'}))
                .catch((e) => {
                  this.setState({updated: 'error'})
                  console.log(e);
                }
                );
        }

    }

    handleChangeVisibility() {
        this.setState({
            visibility: !this.state.visibility
        });
    }

    render() {
      return (<ProfilePassword
        handleChangePassword1={this.handleChangePassword1}
        handleChangePassword2={this.handleChangePassword2}
        handleUpdatePassword={this.handleUpdatePassword}
        handleChangeVisibility={this.handleChangeVisibility}
        data={this.state.pwd}
        visibility={this.state.visibility}
        validPassword={this.state.validPassword}
        updated={this.state.updated}
        handleChangeCurrentPassword={this.handleChangeCurrentPassword}
        />);
    }
}
