import React from 'react';

const SimpleTextarea = (props) => (
    <div className="input-container input-container-textarea" >
        <label>
            {props.labeltitle}
        </label>
        <textarea style={props.resize? null: {  resize: 'none'}} rows={props.rows} value={props.content} onChange={props.controller}/>
    </div>
);

SimpleTextarea.propTypes = {
  labeltitle: React.PropTypes.string.isRequired,
  rows: React.PropTypes.number.isRequired,
  content: React.PropTypes.string.isRequired,
  resize: React.PropTypes.bool,
  controller: React.PropTypes.func.isRequired
};

export default SimpleTextarea;
