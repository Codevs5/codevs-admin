import React, { PropTypes } from 'react';

import SimpleSelect from '../../form/SimpleSelect.js';

const ValidatorEntryReviewer = ({reviewer, options, handleChange, isUser}) => {

  return (
    <div className="validator-entry-expanded--reviewer row">
      {reviewer.author.name}
      <SimpleSelect enable={isUser} options={options} selected={reviewer.state} handleChange={function(e){handleChange(e, reviewer.author.id)}} title="Review state"/>
    </div>
  );
}

ValidatorEntryReviewer.propTypes = {
  reviewer: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  isUser: PropTypes.bool
};

export default ValidatorEntryReviewer;
