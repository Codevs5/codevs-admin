import React, { PropTypes } from 'react';

const ValidatorEntryResume = ({entry, iconVisible, handleVisible}) => {
  const labelIcon = `validator-entry-resume--label ${entry.state}`;
  return (
    <div className="validator-entry-resume row">
      <div className={labelIcon}>{entry.state} </div>
      <span className="validator-entry-resume--title">{entry.title} </span>
      <i className={iconVisible} onClick={handleVisible}/>
    </div>
  );
};

ValidatorEntryResume.propTypes = {
  entry: PropTypes.object.isRequired,
  iconVisible: PropTypes.string.isRequired,
  handleVisible: PropTypes.func.isRequired
};

export default ValidatorEntryResume;
