import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

//Components
import { Home } from './components/home/Home.js';
import  Profile  from './components/profile/Profile.js';
import  UsersContainer  from './containers/UsersContainer.js';
import  NewUserContainer from './containers/NewUserContainer.js';
import  UsersListContainer from './containers/UsersListContainer.js';
import  MenuContainer  from './containers/MenuContainer.js';
import  EntriesContainer  from './containers/EntriesContainer.js';
import  PublishedEntriesContainer  from './containers/PublishedEntriesContainer.js';
import  ValidatorEntriesContainer  from './containers/ValidatorEntriesContainer.js';


export const AppRouter = ({handleLogout}) => (
  <Router>
    <div>
      <MenuContainer handleLogout={handleLogout}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/users" component={UsersContainer} />
        <Route exact path="/users/add" component={NewUserContainer} />
        <Route exact path="/users/list" component={UsersListContainer} />
        <Route exact path="/entries" component={EntriesContainer} />
        <Route exact path="/entries/published" component={PublishedEntriesContainer} />
        <Route exact path="/entries/validator" component={ValidatorEntriesContainer} />
      </Switch>
    </div>
  </Router>
)
