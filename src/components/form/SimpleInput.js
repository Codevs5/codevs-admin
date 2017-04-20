import React, {PropTypes} from 'react';

const SimpleInput = (props) => {
    return (
        <div className="input-container">
            <label>
                {props.labeltitle}:
            </label>
            <input type={props.inputType} value={props.content} onChange={props.controller} className={props.design}/>
        </div>
    );
};
SimpleInput.propTypes = {
    labeltitle: PropTypes.string.isRequired,
    inputType: PropTypes.oneOf(['text', 'number', 'date', 'email', 'password']).isRequired,
    content: PropTypes.string,
    controller: PropTypes.func.isRequired,
    design: PropTypes.string
};

export default SimpleInput;
