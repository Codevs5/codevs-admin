import React, { PropTypes } from 'react';

import '../../style/assets/__form.scss';

const SimpleFile = ({accept, controller, label, icon}) => {

   return (
     <div className="file-upload">
       <label htmlFor="upload" className="btn-upload--file"><i className={icon} /> {label} </label>
       <input id="upload" className="hidden" type='file' accept={accept || '.png'} onChange={controller} />
     </div>
   )
};

SimpleFile.propTypes = {
  label: PropTypes.string.isRequired,
  controller: PropTypes.func.isRequired,
  accept: PropTypes.string,
  icon: PropTypes.string
};

export default SimpleFile;
