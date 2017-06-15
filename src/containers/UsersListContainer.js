import React, { Component } from 'react';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

import { fetchAllUsers } from '../actions/userListActions.js';
import UsersList from '../components/users/UsersList.js';
import LoadingList from '../components/layout/LoadingList.js';
import ErrorComponent from '../components/layout/ErrorComponent.js';

class UserListContainer extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(fetchAllUsers());
  }


  render(){
    if (this.props.error)
        return (<ErrorComponent/>);
    else if (this.props.loading)
        return (<LoadingList/>);
    else
      return (
        <UsersList users={this.props.users}/>
      );
  }
}

const mapStateToProps = (state, action) => ({
  users: state.userList,
  error: state.status.error,
  loading: state.status.loading
})
export default connect(mapStateToProps)(UserListContainer);
