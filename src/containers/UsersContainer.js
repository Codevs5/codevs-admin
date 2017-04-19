import React, { Component } from 'react';

import Users from '../components/users/Users.js';

export default class UsersContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (<Users />);
  }
}
