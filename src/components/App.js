import React, { PropTypes } from 'react';

import Login from './login/Login.js'
import AppRouter from './AppRouter.js';
import LoadingHome from './layout/LoadingHome.js';

const App = ({handleLoginWithGoogle, handleLoginWithCredentials, handleLogout, handleEmailChange, handlePasswordChange, logged, loading, fail}) => {
  if(logged) return (<AppRouter handleLogout={handleLogout} />);
  else if (loading) return (<LoadingHome />);
  else return (<Login
      handleLoginWithCredentials={handleLoginWithCredentials}
      handleLoginWithGoogle={handleLoginWithGoogle}
      handlePasswordChange={handlePasswordChange}
      handleEmailChange={handleEmailChange}
      fail={fail}
      />);
}

App.propTypes = {
  logged: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleLoginWithCredentials: PropTypes.func.isRequired,
  handleLoginWithGoogle: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  fail: PropTypes.bool.isRequired
}

export default App;
