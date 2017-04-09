import React, { Component } from 'react';
import * as firebase from 'firebase';
import FormContainer from './FormContainer.js';



export default class Profile extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div className="profile-container">
        <h2> Profile </h2>
        <FormContainer />
      </div>
    );
  }
}
