import React from 'react';
import '../style/__login.scss';

export const Login = ({handleLogin}) => (
    <div className="login-page">
      <div>
        <img src="./images/logo.png" height="128px" width="110px" alt="CoDevs Logo" />
        <button className="button primary button-login" onClick={handleLogin}>Login</button>
        <p> Copyright 2017 © CoDevs </p>
      </div>
    </div>
);
