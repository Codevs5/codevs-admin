import React, { Component, PropTypes } from 'react';


export default class ValidatorEntriesContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      entries : []
    }
  }

  renderEmptyList(){
    return (
      <p>
        There are not entries to validate!
      </p>
    );
  }

  renderEntryList(){
    return (
      <div/>
    );
  }

  render(){
    return (
      <div className="container">
        Weeeah!
      </div>
    );
  }
}
