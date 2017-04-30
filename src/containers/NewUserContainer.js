import React, {Component} from 'react';
import * as firebase from 'firebase';

import { connect } from 'react-redux';

import NewUser from '../components/users/NewUser.js';


import {addNewUser} from '../actions/userListActions.js';

class NewUserContainer extends Component {
    constructor(props) {
        super(props);
        this.roles = ['admin', 'user'];

        this.state = {
            name: '',
            lastname: '',
            role: this.roles[0],
            email: '',
            password: '',
            pwdVisibility: false
        }

        this.handleNewUser = this.handleNewUser.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordVisibility = this.handlePasswordVisibility.bind(this);
    }

    handleNewUser() {
        this.props.dispatch(addNewUser(this.state));
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleLastnameChange(e) {
        this.setState({lastname: e.target.value});
    }

    handleRoleChange(e) {

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
            loading={this.props.loading}
            error={this.props.error}
            updated={this.props.updated}
          />);
    }
}

const mapStateToProps = (state, action) => ({
  error: state.status.error,
  updated: state.status.updated,
  loading: state.status.loading
});

export default connect(mapStateToProps)(NewUserContainer);
