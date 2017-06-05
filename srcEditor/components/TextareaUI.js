import React, { PropTypes } from 'react';
import {Editor} from 'draft-js';

import '../styles/__textarea.scss';

const TextareaUI = ({editorState, editorOnChange, styleMap, blockStyle, onTab, handleKeyCommand}) => (
  <div className="textarea">
    <Editor customStyleMap={styleMap} handleKeyCommand={handleKeyCommand} editorState={editorState} onTab={onTab} onChange={editorOnChange} blockStyleFn={blockStyle}/>
  </div>
);

TextareaUI.propTypes = {
  editorState: PropTypes.object.isRequired,
  editorOnChange: PropTypes.func.isRequired,
  onTab: PropTypes.func.isRequired
};

export default TextareaUI;
