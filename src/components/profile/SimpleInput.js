import React from 'react';

const SimpleInput = (props) => (
    <div>
        <label>
            {props.labeltitle}
        </label>
        <input type={props.inputType} value={props.content} onChange={props.controller}/>
    </div>
);

SimpleInput.propTypes = {
  labeltitle: React.PropTypes.string.isRequired,
  inputType: React.PropTypes.oneOf(['text', 'number', 'date']).isRequired,
  content: React.PropTypes.string.isRequired,
  controller: React.PropTypes.func.isRequired
};

export default SimpleInput;
