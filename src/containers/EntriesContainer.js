import React, { Component } from 'react';
import Entries from '../components/entries/Entries.js';

export default class EntriesContainer extends Component{
  constructor(props){
    super(props);

  }

  render(){
    return (<Entries />);
  }
}
