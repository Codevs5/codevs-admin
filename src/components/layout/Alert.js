import React, { PropTypes } from 'react';

const Alert = ({type, message, icon}) => {
  const boxClass = `alert alert-${type}`;
  return (
    <div className={boxClass}>
      <i className={icon}/>
      <p> {message} </p>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default Alert;
