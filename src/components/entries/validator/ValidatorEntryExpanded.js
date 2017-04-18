import React, { PropTypes } from 'react';

import ValidatorEntryReviewer from './ValidatorEntryReviewer.js';

const ValidatorEntryExpanded = ({visible, reviewers, handleReviewChange, handleAddReviewer, handlePublish, options, openInBrowser}) => {

  //TODO: Gestionar si el array de reviewers viene vacio

  const container = (visible)?'validator-entry-expanded':'hidden';
  const buttonValidator = (reviewers.length === 2)?'':<button onClick={handleAddReviewer}>Validate</button>;
  return (
    <div className={container}>
      {reviewers.map((reviewer, i) => <ValidatorEntryReviewer key={i} reviewer={reviewer} options={options} handleChange={handleReviewChange}/>)}
      <div className="validator-entry-expanded--buttons">
        {buttonValidator}
        <button onClick={handlePublish}>Publicar</button>
        <button onClick={openInBrowser}>Open entry </button>
      </div>
    </div>
  );
};

ValidatorEntryExpanded.propTypes = {
  visible: PropTypes.bool.isRequired,
  reviewers: PropTypes.array.isRequired,
  handleReviewChange: PropTypes.func.isRequired,
  handleAddReviewer: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  openInBrowser: PropTypes.func.isRequired
};

export default ValidatorEntryExpanded;
