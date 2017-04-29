import React, { PropTypes } from 'react';

const ValidatorEntryResume = ({entry, iconVisible, handleVisible}) => {
  const labelIcon = `validator-entry-resume--label ${parseState(entry.state)}`;

  return (
    <div className="validator-entry-resume row">
      <span className="validator-entry-resume--title">{entry.title} </span>
      <div className="row">
        <div className={labelIcon}>{parseState(entry.state)} </div>
        <i className={iconVisible} onClick={handleVisible}/>
      </div>
    </div>
  );
};

ValidatorEntryResume.propTypes = {
  entry: PropTypes.object.isRequired,
  iconVisible: PropTypes.string.isRequired,
  handleVisible: PropTypes.func.isRequired
};

export default ValidatorEntryResume;

function parseState(state) {
    switch (state) {
        case 'pending':
            return 'Pendiente';
        case 'accepted':
            return 'Aceptada';
        case 'declined':
            return 'Rechazada';

    }
}
