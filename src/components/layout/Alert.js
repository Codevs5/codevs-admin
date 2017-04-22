import React, { PropTypes } from 'react';

import '../../style/__alert.scss';

const Alert = ({type, message, icon}) => {
  const boxClass = `alert alert-${type}`;
  return (
    <div className={boxClass}>
      <div className="alert--inner">
        <i className={icon}/>
        <p> {message} </p>
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default Alert;
