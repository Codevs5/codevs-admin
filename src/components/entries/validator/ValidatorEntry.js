import React, { PropTypes } from 'react';

import ValidatorEntryResume from './ValidatorEntryResume.js';
import ValidatorEntryExpanded from './ValidatorEntryExpanded.js';

const ValidatorEntry = ({ reviewers, entryResume, handleVisible, visible, options, handlePublish, handleAddReviewer, handleReviewChange, openInBrowser }) => {
  const iconVisible = `fa fa-${(visible)?'caret-up':'caret-down'}`;
  return (
  <div className="validator-entry">
    <ValidatorEntryResume entry={entryResume} iconVisible={iconVisible} handleVisible={handleVisible}/>
    <ValidatorEntryExpanded
      reviewers={reviewers}
      visible={visible}
      handleAddReviewer={handleAddReviewer}
      handlePublish={handlePublish}
      handleReviewChange={handleReviewChange}
      options={options}
      openInBrowser={openInBrowser}
      />
  </div>
);
}

ValidatorEntry.propTypes = {
  reviewers: PropTypes.array.isRequired,
  entryResume: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  handleVisible: PropTypes.func.isRequired,
  handleAddReviewer: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleAddReviewer: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  openInBrowser: PropTypes.func.isRequired
};

export default ValidatorEntry;
