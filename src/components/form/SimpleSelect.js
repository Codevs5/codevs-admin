import React, {PropTypes} from 'react';

const SimpleSelect = ({title, options, handleChange}) => {
    const listOptions = options.map((opt, i) => (
        <option value={opt} key={i}>
            {opt}
        </option>
    ));
    return (
        <div className="select-box">
            <label>
                {title}
            </label>
            <select onChange={handleChange}>
                {listOptions}
            </select>
        </div>
    );
};

SimpleSelect.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    handleBioChange: PropTypes.func
};

export default SimpleSelect;
