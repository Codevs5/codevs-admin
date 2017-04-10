import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

//Components
import { Home } from './components/home/Home.js';
import  Profile  from './components/profile/Profile.js';
import { Users } from './components/users/Users.js';
import  Menu  from './components/layout/Menu.js';

export const AppRouter = ({handleLogout}) => (
  <Router>
    <div>
      <Menu handleLogout={handleLogout}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/users" component={Users} />

      </Switch>
    </div>
  </Router>
)
