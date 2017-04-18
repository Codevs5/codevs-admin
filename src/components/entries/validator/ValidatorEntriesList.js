import React, { PropTypes } from 'react';
import ValidatorEntryContainer from '../../../containers/ValidatorEntryContainer.js';

const ValidatorEntriesList = ({entries}) => (
  <div className="validator-list">
    {entries.map((entry, i) => <ValidatorEntryContainer entry={entry} key={i}/> )}
  </div>
);

ValidatorEntriesList.propTypes = {
  entries : PropTypes.array.isRequired
};

export default ValidatorEntriesList;
