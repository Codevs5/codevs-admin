import React, {PropTypes} from 'react';
import EntryValidateType from './EntryValidateType.js';

const EntryValidateSelectBox = ({entryTypes, handleToggle}) => (
  <div className="validate-select row" >
    {entryTypes.map((elem, i) => (<EntryValidateType key={i} type={elem} handleToggle={handleToggle}/>))}
  </div>
);

EntryValidateSelectBox.propTypes = {
  entryTypes: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired
};

export default EntryValidateSelectBox;
