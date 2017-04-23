import React, {PropTypes} from 'react';

const EntryValidateType = ({handleToggle, type}) => {
    const classContainer = `validate-select--box ${type.type}`;
    return (
        <div className={classContainer}>
            <input className="styled-checkbox" id={type.type} type="checkbox" value={type.type} checked={type.selected} onChange={function() {
                handleToggle(type.type)
            }}/>
          <label htmlFor={type.type}>
                {type.description}
            </label>
            <i className={type.icon} />
        </div>
    );
}

EntryValidateType.propTypes = {
    handleToggle: PropTypes.func.isRequired,
    type: PropTypes.object.isRequired
};

export default EntryValidateType;
