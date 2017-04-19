import React, { Component } from 'react';

import UsersList from '../components/users/UsersList.js';

export default class UsersListContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (<UsersList />);
  }
}
