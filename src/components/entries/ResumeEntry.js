import React, { PropTypes } from 'react';

const ResumeEntry = ({changeVisibility, id, visible, title, icons, toggleInfo}) => {

  return (
    <div className="row entry-item-resume">
        <img src="./images/default.png" height="30px" width="50px" className="entry-item-resume--image"/>
        <h3>{title}</h3>
        <div className="entry-item-resume--icons">
          <i className={icons.visibilityClass} onClick={function() {
              changeVisibility(id, !visible)
          }}/>
        <i className={icons.toggleClass} onClick={toggleInfo}/>
        </div>
    </div>
  );
};

ResumeEntry.propTypes = {
  changeVisibility : PropTypes.func.isRequired,
  toggleInfo : PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  icons: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default ResumeEntry;
