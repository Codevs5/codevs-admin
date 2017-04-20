import React, {Component} from 'react';
import * as firebase from 'firebase';

import App from '../components/App.js';

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            logged: false,
            loading: false,
            fail: false
        }

        this.handleLoginWithGoogle = this.handleLoginWithGoogle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLoginWithCredentials = this.handleLoginWithCredentials.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLoginWithCredentials(e) {
        this.setState({loading: true});
        firebase.auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(user => this.setState({loading: false, logged: true, fail: false}))
          .catch(err => this.setState({loading: false, fail: true, logged: false}));
    }

    handleLogout() {
        firebase.auth().signOut();
    }

    handleLoginWithGoogle() {
        // this.setState({loading: true});
        // const provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithRedirect(provider).then(user => console.log(user)).catch(err => console.log(err));
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({logged: true})
            } else {
                this.setState({logged: false})
            }
        });
    }

    render() {
        return (<App
          handleLoginWithGoogle={this.handleLoginWithGoogle}
          handleLoginWithCredentials={this.handleLoginWithCredentials}
          handleLogout={this.handleLogout}
          loading={this.state.loading}
          logged={this.state.logged}
          fail={this.state.fail}
          handlePasswordChange={this.handlePasswordChange}
          handleEmailChange={this.handleEmailChange}/>);
    }
}
