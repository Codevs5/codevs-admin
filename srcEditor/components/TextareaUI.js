import React, { PropTypes } from 'react';
import {Editor} from 'draft-js';
//import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import '../styles/__textarea.scss';

const TextareaUI = ({editorState,handleReturn, editorOnChange, styleMap, blockStyle, onTab, handleKeyCommand}) => (
  <div className="textarea">
    <Editor
      handleReturn={handleReturn}
      customStyleMap={styleMap}
      handleKeyCommand={handleKeyCommand}
      editorState={editorState}
      onTab={onTab}
      onChange={editorOnChange}
      blockStyleFn={blockStyle}
      blockRendererFn={blockStyle}
      
      />
  </div>
);

TextareaUI.propTypes = {
  editorState: PropTypes.object.isRequired,
  editorOnChange: PropTypes.func.isRequired,
  onTab: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired
};

export default TextareaUI;
