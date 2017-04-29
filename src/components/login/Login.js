import React, { PropTypes } from 'react';

import SimpleInput from '../form/SimpleInput.js';
import Alert from '../layout/Alert.js';

import '../../style/__login.scss';

const Login = ({handleLoginWithCredentials, handleEmailChange, handlePasswordChange, fail}) => {

  return (
  <div className="login-page">
    <div>
      <img src="./images/logo.png" height="128px" width="110px" alt="CoDevs Logo" />
      <SimpleInput inputType="text" labeltitle="Email" controller={handleEmailChange} />
      <SimpleInput inputType="password" labeltitle="Password" controller={handlePasswordChange} />
      <button type="submit" className="button-login" onClick={handleLoginWithCredentials}>Login</button>
      {fail && (<Alert message="Error, bad credentials" type="error" icon="fa fa-error" />)}
        <button className="loginBtn loginBtn--google">
            Login with Google
        </button>
      <p> Copyright 2017 © CoDevs </p>
    </div>
  </div>
);
};

Login.propTypes = {
  handleLoginWithCredentials: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  fail: PropTypes.bool.isRequired
};

export default Login;
