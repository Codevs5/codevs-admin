import React, {PropTypes} from 'react';

const SimpleSelect = ({title, options, handleChange, selected, enable, label}) => {
    const listOptions = options.map((opt, i) => (
        <option value={(typeof opt === typeof {})?opt.opt:opt} key={i}>
            {(typeof opt === typeof {})?opt.label:opt}
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
    enable: PropTypes.bool,
    label: PropTypes.string
};

export default SimpleSelect;
