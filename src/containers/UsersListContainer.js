import React, { Component } from 'react';
import * as firebase from 'firebase';

import UsersList from '../components/users/UsersList.js';

export default class UserListContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: false
    };
  }

  componentDidMount(){
    const dbRef = firebase.database().ref('/users/');

    dbRef.once('value')
         .then(res => res.val())
         .then(data => {
          let users = Object.keys(data).map((key) => {
            data[key].id = key;
            return data[key];
          });
          users.sort((a, b) => {
            if (a.metadata.firstname.toLowerCase() > b.metadata.firstname.toLowerCase()) {
              return 1;
            }
            if (a.metadata.firstname.toLowerCase() < b.metadata.firstname.toLowerCase()) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          this.setState({users});
          this.setState({loading: false, error: false});
         })
         .catch(err => {
           console.log(err);
           this.setState({loading: false, error: true});
         })
  }


  render(){
    return (
      <UsersList error={this.state.error} loading={this.state.loading} users={this.state.users}/>
    );
  }
}
