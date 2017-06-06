import React, { Component } from 'react';
import MenuCard from '../components/layout/MenuCard.js';
import { connect } from 'react-redux';

import { createEntry } from '../actions/publishedEntriesActions';

class EntriesContainer extends Component{
  constructor(props){
    super(props);
    this.createEntry = () => this._createEntry();
  }

  _createEntry(){
    this.props.dispatch(createEntry());
  }

  render(){
    const entries = [
        {
            linkPath: '/entries/published',
            title: 'Published entries',
            imagePath: 'publishedEntries.png'
        }, {
          linkPath: '/entries/published',
          title: 'Create new entry',
          imagePath: 'addEntry.png',
          controller: this.createEntry
        }
    ];
    return (<MenuCard title="Entries" cards={entries} />);
  }
}


export default connect()(EntriesContainer);
