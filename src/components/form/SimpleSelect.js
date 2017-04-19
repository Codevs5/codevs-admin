import React, {PropTypes} from 'react';

const SimpleSelect = ({title, options, handleChange, selected}) => {
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
            <select onChange={handleChange} value={selected}>
                {listOptions}
            </select>
        </div>
    );
};

SimpleSelect.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    selected: PropTypes.string
};

export default SimpleSelect;
