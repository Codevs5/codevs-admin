import React, {PropTypes} from 'react';

import Login from './login/Login.js'
import AppRouter from './AppRouter.js';
import LoadingHome from './layout/LoadingList.js';

const App = ({
  handleLoginWithCredentials,
  handleLogout,
  handleEmailChange,
  handlePasswordChange,
  logged,
  loading,
  fail
}) => {
  if (logged === 1)
    return (<AppRouter handleLogout={handleLogout}/>);
  else if (logged === 0)
    return (<LoadingHome/>);
  else
    return (
      <Login handleLoginWithCredentials={handleLoginWithCredentials}
            handlePasswordChange={handlePasswordChange}
            handleEmailChange={handleEmailChange}
            fail={fail}
          />);
  }

App.propTypes = {
  logged: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleLoginWithCredentials: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  fail: PropTypes.bool.isRequired
}

export default App;
