import React, {Component} from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import * as actions from '../actions/userActions.js';

import App from '../components/App.js';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLoginWithCredentials = this.handleLoginWithCredentials.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }

    handleLoginWithCredentials(e) {
      this.props.dispatch(actions.startLogging(this.state.email, this.state.password));
    }

    handleLogout() {
        firebase.auth().signOut();
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
                this.props.dispatch(actions.userLogged(user));
            } else {
                this.props.dispatch(actions.userLogout());
            }
        });
    }

    render() {
        return (<App
          handleLoginWithGoogle={this.handleLoginWithGoogle}
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
