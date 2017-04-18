import React, { Component, PropTypes } from 'react';

//Borrar
import LoadingList from '../components/layout/LoadingList.js';
import ValidatorEntriesList from '../components/entries/validator/ValidatorEntriesList.js';

export default class ValidatorEntriesListContainer extends Component{

  constructor(props){
    super(props);

  }


  render(){
    if(this.props.loading) return (<LoadingList />);
    else return (<ValidatorEntriesList entries={this.props.entries} />);
  }

}

ValidatorEntriesListContainer.propTypes = {
  entries : PropTypes.array.isRequired,
  loading : PropTypes.bool.isRequired
}
