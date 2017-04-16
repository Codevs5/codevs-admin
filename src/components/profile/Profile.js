import React, { Component } from 'react';
import * as firebase from 'firebase';
import FormProfileContainer from '../../containers/FormProfileContainer.js';
import  Header  from '../layout/Header.js';

const Profile = () => (
  <div className="profile-container container">
    <Header title="Profile" />
    <FormProfileContainer />
  </div>
);

export default Profile;
