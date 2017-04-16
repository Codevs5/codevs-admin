import React, { PropTypes } from 'react';

const TagInput = ({title, placeText, handleTagAdded}) => {
  return (
    <div className="tag-box">
      <label>{title}</label>
      <input type="text" placeholder={placeText || 'Add new tag'} className="input-tag" onKeyPress={handleTagAdded}/>
    </div>
  );
};

TagInput.propTypes = {
  title: PropTypes.string.isRequired,
  placeText: PropTypes.string,
  handleTagAdded: PropTypes.func.isRequired
};

export default TagInput;
