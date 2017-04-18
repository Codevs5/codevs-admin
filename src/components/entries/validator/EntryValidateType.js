import React, {PropTypes} from 'react';

const EntryValidateType = ({handleToggle, type}) => {
    const classContainer = `validate-select--box ${type.type}`;
    return (
        <div className={classContainer}>
            <input type="checkbox" value={type.ype} checked={type.selected} onChange={function() {
                handleToggle(type.type)
            }}/>
            <label>
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
