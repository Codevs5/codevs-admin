import React, { Component } from 'react';
import * as firebase from 'firebase';
import FormContainer from './FormContainer.js';
import { Header } from '../layout/Header.js';


export default class Profile extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div className="profile-container container">
        <Header title="Profile" />
        <FormContainer />
      </div>
    );
  }
}
