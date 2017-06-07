import React, {PropTypes} from 'react';

import '../styles/__header.scss';
import SimpleInput from '../../src/components/form/SimpleInput.js';

const HeaderUI = ({
  saving,
  saveFn,
  title,
  editing,
  handleChangeTitle,
  handleToggleEditable
}) => {
  const savingClass = `saving ${ (!saving)
    ? 'hidden'
    : ''}`;
  const titleElem = (editing)
    ? (<SimpleInput controller={handleChangeTitle} labeltitle='' content={title} inputType="text" design="title-input"/>)
    : (
      <h2>{title}</h2>
    );
  const editableIcon = (editing)
    ? 'fa fa-floppy-o'
    : 'fa fa-pencil';
  return (
    <div className="header">
      <div className="header-title">
        {titleElem}
        <div className="btn-edit" onClick={handleToggleEditable}>
          <i className={editableIcon}/>
        </div>
      </div>
      <div>
        <div className={savingClass}><i className="fa fa-spinner"/></div>
        <button onClick={saveFn}><i className="fa fa-save"/></button>
      </div>
    </div>
  );
}

HeaderUI.propTypes = {
  saving: PropTypes.bool,
  saveFn: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleToggleEditable: PropTypes.func.isRequired
};

export default HeaderUI;
