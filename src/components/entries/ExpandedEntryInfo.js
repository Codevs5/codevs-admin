import React, { PropTypes } from 'react';

import TagInput from '../form/TagInput.js';
import SimpleSelect from '../form/SimpleSelect.js';
import EntryTagList from './EntryTagList.js';

const ExpandedEntryInfo = ({data, handleTagRemoved, handleTagAdded, tags, info}) => (
  <div className={info}>
      <div className="entry-item-expanded--data row">
          <p><span className="label"><i className="fa fa-user"/>Author:</span> {data.author}</p>
          <p><span className="label"><i className="fa fa-calendar"/>Date:</span>{data.date}</p>
          <p><span className="label"><i className="fa fa-globe"/>URL:</span>{data.url}</p>
      </div>
      <EntryTagList tags={tags} handleRemove={handleTagRemoved} label="Tag list:"/>
      <TagInput title="Add new tag:" handleTagAdded={handleTagAdded}/>
  </div>
);

ExpandedEntryInfo.propTypes = {
  data: PropTypes.object.isRequired,
  handleTagAdded: PropTypes.func.isRequired,
  handleTagRemoved: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  info: PropTypes.string.isRequired
};

export default ExpandedEntryInfo;
