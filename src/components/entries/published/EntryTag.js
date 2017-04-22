import React, { PropTypes } from 'react';

const EntryTag = ({value, handleRemove}) => {
  return (
    <li className="tag-list--item">
      <span>{value}</span>
      <i className="fa fa-remove icon-click" onClick={function(){handleRemove(value)}}/>
    </li>
  );
};

EntryTag.propTypes = {
  value: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default EntryTag;
