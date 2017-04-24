import React, { Component } from 'react';
import * as firebase from 'firebase';

import MenuCard from '../components/layout/MenuCard.js';

export default class ProfileContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const user = firebase.auth().currentUser;
    const pages = [
        {
            linkPath: `/profile/basic/${user.uid}`,
            title: 'Basic profile',
            imagePath: 'basicProfile.png'
        }, {
            linkPath: '/profile/password',
            title: 'Change password',
            imagePath: 'chagePass.png'
        }, {
          linkPath: '/user/stat', //
          title: 'User stats',
          imagePath: 'userStats.png'
        }
    ]
    return (<MenuCard title="User profile" cards={pages} />);
  }
}
