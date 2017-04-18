import React, { PropTypes } from 'react';

import SimpleSelect from '../../form/SimpleSelect.js';

const ValidatorEntryReviewer = ({reviewer, options, handleChange}) => {

  return (
    <div className="validator-entry-expanded--reviewer">
      {reviewer.author.name}
      <SimpleSelect options={options} selected={reviewer.state} handleChange={handleChange} title="Review state"/>
    </div>
  );
}

ValidatorEntryReviewer.propTypes = {
  reviewer: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ValidatorEntryReviewer;
