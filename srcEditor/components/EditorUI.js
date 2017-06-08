import React, {PropTypes} from 'react';

import StylingButtons from './StylingButtons';
import TextareaUI from './TextareaUI';
import ImagePrompt from './ImagePrompt';

import '../styles/__editor.scss';

const EditorUI = ({
  buttons,
  plugins,
  handleReturn,
  editorState,
  editorOnChange,
  styleMap,
  blockStyle,
  onTab,
  handleKeyCommand,
  showPrompt
}) => (
  <div className="container">
    {showPrompt && <ImagePrompt data={buttons.image}/>}
    <StylingButtons
      buttons={buttons}
      editorState={editorState}
      />
    <TextareaUI
      plugins={plugins}
      handleReturn={handleReturn}
      handleKeyCommand={handleKeyCommand}
      styleMap={styleMap}
      editorState={editorState}
      editorOnChange={editorOnChange}
      blockStyle={blockStyle}
      onTab={onTab}
      />
  </div>
);

EditorUI.propTypes = {
  buttons: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
  editorOnChange: PropTypes.func.isRequired,
  onTab: PropTypes.func.isRequired,
  handleKeyCommand: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired,
  showPrompt: PropTypes.bool.isRequired
};

export default EditorUI;
