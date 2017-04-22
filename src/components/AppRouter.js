import { HashRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { PropTypes } from 'react';

//Components
import { Home } from './home/Home.js';

import  ProfileContainer  from '../containers/ProfileContainer.js';
import  FormProfileContainer  from '../containers/FormProfileContainer.js';
import  UsersContainer  from '../containers/UsersContainer.js';
import  NewUserContainer from '../containers/NewUserContainer.js';
import  UsersListContainer from '../containers/UsersListContainer.js';
import  ProfilePasswordContainer from '../containers/ProfilePasswordContainer.js';

import  MenuContainer  from '../containers/MenuContainer.js';

import  EntriesContainer  from '../containers/EntriesContainer.js';
import  PublishedEntriesContainer  from '../containers/PublishedEntriesContainer.js';
import  ValidatorEntriesContainer  from '../containers/ValidatorEntriesContainer.js';
import PublishedEntryContainer from '../containers/PublishedEntryContainer.js';

import CalendarContainer from '../containers/CalendarContainer.js';
import StatsContainer from '../containers/StatsContainer.js';

const AppRouter = ({handleLogout}) => (
  <HashRouter>
    <div>
      <MenuContainer handleLogout={handleLogout}/>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/profile" component={ProfileContainer} />
        <Route exact path="/profile/basic" component={FormProfileContainer} />
        <Route exact path="/profile/password" component={ProfilePasswordContainer} />
        <Route exact path="/users" component={UsersContainer} />
        <Route exact path="/users/add" component={NewUserContainer} />
        <Route exact path="/users/list" component={UsersListContainer} />

        <Route exact path="/entries" component={EntriesContainer} />
        <Route exact path="/entries/published" component={PublishedEntriesContainer} />
        <Route path="/entries/published/:id" component={PublishedEntryContainer} />
        <Route exact path="/entries/validator" component={ValidatorEntriesContainer} />

        <Route exact path="/stats" component={StatsContainer} />
        <Route exact path="/calendar" component={CalendarContainer} />
      </Switch>
    </div>
  </HashRouter>
);

AppRouter.propTypes = {
  handleLogout : PropTypes.func.isRequired
};

export default AppRouter;
