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
      <h2 className="title">{title}</h2>
    );
  const editableIcon = (editing)
    ? 'fa fa-floppy-o'
    : 'fa fa-pencil';
  return (
    <div className="header">
      <div className="header-title row">
        {titleElem}
        <div className="edit-btn" onClick={handleToggleEditable}>
          <i className={editableIcon}/>
        </div>
      </div>
      <div className="row">
        <div className={savingClass}><i className="fa fa-spinner"/></div>
        <button className="save-btn" onClick={saveFn}><i className="fa fa-save"/></button>
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
