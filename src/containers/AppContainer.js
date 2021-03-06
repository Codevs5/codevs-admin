import React, {Component} from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { userLogged, startLogging, userLogout } from '../actions/userActions.js';

import App from '../components/App.js';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleLogout = () => this._handleLogout();
        this.handleLoginWithCredentials = (e) => this._handleLoginWithCredentials(e);
        this.handleEmailChange = (e) => this._handleEmailChange(e);
        this.handlePasswordChange = (e) => this._handlePasswordChange(e);

    }

    _handleLoginWithCredentials(e) {
      this.props.dispatch(startLogging(this.state.email, this.state.password));
    }

    _handleLogout() {
        firebase.auth().signOut();
    }

    _handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    _handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.dispatch(userLogged(user));
            } else {
                this.props.dispatch(userLogout());
            }
        });
    }

    render() {
        return (<App
          handleLoginWithCredentials={this.handleLoginWithCredentials}
          handleLogout={this.handleLogout}
          loading={this.props.loading}
          logged={this.props.logged}
          fail={this.props.error}
          handlePasswordChange={this.handlePasswordChange}
          handleEmailChange={this.handleEmailChange}/>);
    }
}

const mapStateToProps = (state, actions) => ({
  loading: state.status.loading,
  logged: state.status.logged,
  error: state.status.error,
  user: state.user
});
export default connect(mapStateToProps)(AppContainer);
