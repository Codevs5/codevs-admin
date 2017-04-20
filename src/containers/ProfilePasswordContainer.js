import React, {Component} from 'react';

import ProfilePassword from '../components/profile/ProfilePassword.js';

export default class ProfilePasswordContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: {
                password: '',
                password2: ''
            },
            visibility: false,
            validPassword: false,
            updated: ''
        };

        this.handleChangePassword1 = this.handleChangePassword1.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
        this.handleChangeVisibility = this.handleChangeVisibility.bind(this);

    }

    handleChangePassword1(e) {
        const tmpPwd = Object.assign({}, this.state.pwd, {password: e.target.value});
        this.setState({pwd: tmpPwd});
    }

    handleChangePassword2(e) {
        const tmpPwd = Object.assign({}, this.state.pwd, {password2: e.target.value});
        this.setState({pwd: tmpPwd});
    }

    handleUpdatePassword() {
        console.log(this.state);
    }

    handleChangeVisibility() {
        this.setState({
            visibility: !this.state.visibility
        });
    }

    render() {
        return (<ProfilePassword handleChangePassword1={this.handleChangePassword1} handleChangePassword2={this.handleChangePassword2} handleUpdatePassword={this.handleUpdatePassword} handleChangeVisibility={this.handleChangeVisibility} data={this.state.pwd} visibility={this.state.visibility} validPassword={this.state.validPassword} updated={this.state.updated}/>);
    }
}
