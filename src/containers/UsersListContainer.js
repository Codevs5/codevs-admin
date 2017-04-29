import React, { Component } from 'react';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

import { fetchAllUsers } from '../actions/userListActions.js';
import UsersList from '../components/users/UsersList.js';

class UserListContainer extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(fetchAllUsers());
  }


  render(){
    return (
      <UsersList error={this.props.error} loading={this.props.loading} users={this.props.users}/>
    );
  }
}

const mapStateToProps = (state, action) => ({
  users: state.userList,
  error: state.status.error,
  loading: state.status.loading
})
export default connect(mapStateToProps)(UserListContainer);
