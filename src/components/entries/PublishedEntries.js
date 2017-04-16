import React, { PropTypes } from 'react';
import EntryItemContainer from '../../containers/EntryItemContainer.js';
import Header from '../layout/Header.js';

import '../../style/__entries.scss';

const PublishedEntries = ({ changeVisibility, entries }) => (
  <div className="container ">
    <Header title="Entries" />
    <div className="entry-list container-wHeader">
      {entries.map((entry, i) => <EntryItemContainer data={entry} key={i} changeVisibility={changeVisibility}/>)}
    </div>
  </div>
);

PublishedEntries.propTypes = {
  changeVisibility: PropTypes.func.isRequired,
  entries: PropTypes.array.isRequired
}

export default PublishedEntries;
