import React, { PropTypes } from 'react';

import '../styles/__header.scss';

const HeaderUI = ({saving, saveFn}) => {
  const savingClass = `saving ${(!saving)?'hidden':''}`;
  return (
  <div className="header">
    <div>
      <h1>Aquí va un titulo</h1>
    </div>
    <div>
      <div className={savingClass}><i className="fa fa-spinner" /></div>
      <button onClick={saveFn}><i className="fa fa-save"/></button>
    </div>
  </div>
);
}

HeaderUI.propTypes = {
  saving: PropTypes.bool,
  saveFn: PropTypes.func.isRequired
};

export default HeaderUI;
