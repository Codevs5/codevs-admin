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
            visibilityCurrent: false,
            visibilityNew: false,
            visibilityRepeat: false,
            validPassword: true,
            updated: ''
        };

        this.handleChangePassword1 = this.handleChangePassword1.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
        this.handleChangeVisibilityCurrent = this.handleChangeVisibilityCurrent.bind(this);
        this.handleChangeVisibilityNew = this.handleChangeVisibilityNew.bind(this);
        this.handleChangeVisibilityRepeat = this.handleChangeVisibilityRepeat.bind(this);
        this.handleChangeCurrentPassword = this.handleChangeCurrentPassword.bind(this);

    }

    handleChangePassword1(e) {
        this.setState({pwd: Object.assign({}, this.state.pwd, {password: e.target.value})});
    }

    handleChangePassword2(e) {
        console.log(this.state);
        this.setState({pwd: Object.assign({}, this.state.pwd, {password2: e.target.value})});
        this.setState({validPassword: (e.target.value === this.state.pwd.password)});

    }

    componentDidUpdate(){

    }

    handleChangeCurrentPassword(e) {
        const tmpPwd = Object.assign({}, this.state.pwd, {current: e.target.value});
        this.setState({pwd: tmpPwd});
    }

    handleUpdatePassword() {
        const user = firebase.auth().currentUser;
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

    handleChangeVisibilityCurrent() {
        this.setState({
            visibilityCurrent: !this.state.visibilityCurrent
        });
    }

    handleChangeVisibilityNew(){
      this.setState({
          visibilityNew: !this.state.visibilityNew
      });
    }

    handleChangeVisibilityRepeat(){
      this.setState({
          visibilityRepeat: !this.state.visibilityRepeat
      });
    }
    render() {
      return (<ProfilePassword
        handleChangePassword1={this.handleChangePassword1}
        handleChangePassword2={this.handleChangePassword2}
        handleUpdatePassword={this.handleUpdatePassword}
        handleChangeVisibilityCurrent={this.handleChangeVisibilityCurrent}
        handleChangeVisibilityRepeat={this.handleChangeVisibilityRepeat}
        handleChangeVisibilityNew={this.handleChangeVisibilityNew}
        data={this.state.pwd}
        visibilityNew={this.state.visibilityNew}
        visibilityCurrent={this.state.visibilityCurrent}
        visibilityRepeat={this.state.visibilityRepeat}
        validPassword={this.state.validPassword}
        updated={this.state.updated}
        handleChangeCurrentPassword={this.handleChangeCurrentPassword}
        />);
    }
}
