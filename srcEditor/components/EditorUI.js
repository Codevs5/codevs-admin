import React, { PropTypes } from 'react';

import StylingButtons from './StylingButtons';
import TextareaUI from './TextareaUI';

const EditorUI = ({buttons, handleReturn, editorState, editorOnChange, styleMap, blockStyle, onTab, handleKeyCommand}) => (
  <div>
    <StylingButtons buttons={buttons} editorState={editorState}/>
    <TextareaUI handleReturn={handleReturn} handleKeyCommand={handleKeyCommand} styleMap={styleMap} editorState={editorState} editorOnChange={editorOnChange} blockStyle={blockStyle} onTab={onTab}/>
  </div>
);

EditorUI.propTypes = {
  buttons: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
  editorOnChange: PropTypes.func.isRequired,
  onTab: PropTypes.func.isRequired,
  handleKeyCommand: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired
};

export default EditorUI;
