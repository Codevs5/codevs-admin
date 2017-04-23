import React, { PropTypes } from 'react';

import ValidatorEntryReviewer from './ValidatorEntryReviewer.js';

const ValidatorEntryExpanded = ({visible, reviewers, handleReviewChange, handleAddReviewer, handlePublish, options, openInBrowser, uid}) => {

  //TODO: Gestionar si el array de reviewers viene vacio

  const container = (visible)?'validator-entry-expanded':'hidden';

  return (
    <div className={container}>
      {reviewers.map((reviewer, i) => <ValidatorEntryReviewer isUser={uid===reviewer.author.id} key={i} reviewer={reviewer} options={options} handleChange={handleReviewChange}/>)}
      <div className="validator-entry-expanded--buttons row">
        {reviewers.length < 2 && <button onClick={handleAddReviewer}>Validate</button>}
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
  openInBrowser: PropTypes.func.isRequired,
  uid: PropTypes.string
};

export default ValidatorEntryExpanded;
