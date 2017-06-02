import React, { Component } from 'react';
import MenuCard from '../components/layout/MenuCard.js';

export default class EntriesContainer extends Component{
  constructor(props){
    super(props);

  }

  render(){
    const entries = [
        {
            linkPath: '/entries/published',
            title: 'Published entries',
            imagePath: 'publishedEntries.png'
        }, {
          linkPath: '/entries/add',
          title: 'Create new entry',
          imagePath: 'addEntry.png'
        }
    ];
    return (<MenuCard title="Entries" cards={entries} />);
  }
}
