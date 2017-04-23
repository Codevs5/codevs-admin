import React, {PropTypes} from 'react';

const SimpleSelect = ({title, options, handleChange, selected, enable}) => {
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
            <select disabled={(enable !== null && typeof enable !== 'undefined')?!enable:false} onChange={handleChange} value={selected} className="select-ctrl">
                {listOptions}
            </select>
        </div>
    );
};

SimpleSelect.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    selected: PropTypes.string,
    enable: PropTypes.bool
};

export default SimpleSelect;
