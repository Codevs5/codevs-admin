import React, { PropTypes } from 'react';

import '../styles/__buttons.scss';

const StylingButtons = ({buttons, editorState}) => (
  <div className="styling">
    {buttons.inline.items.map((button, i) => (<InlineButton editorState={editorState} key={i} button={button} controller={buttons.inline.controller} />))}
    {buttons.block.items.map((button, i) => (<BlockButton editorState={editorState} key={i} button={button} controller={buttons.block.controller}/>))}
    <Button button={{style: 'image', icon: 'style-btn fa fa-image'}} controller={buttons.image.addImage} isActive={false} />
  </div>
);

StylingButtons.propTypes = {
  buttons: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
};

export default StylingButtons;

const BlockButton = ({button, controller, editorState}) => {

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <Button button={button} controller={controller} isActive={button.style === blockType}/>
  );
};

BlockButton.propTypes = {
  button: PropTypes.object.isRequired,
  controller: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
};


const InlineButton = ({button, controller, editorState}) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <Button button={button} controller={controller} isActive={currentStyle.has(button.style)}/>
  );
};

InlineButton.propTypes = {
  button: PropTypes.object.isRequired,
  controller: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
};

const Button = ({button, controller, isActive}) => {
  let className = '';
  if(!button.labeled) className += button.icon;
  else className += 'style-btn';
  if(isActive) className += ' active';
  return (
    <div className="btn" onClick={() => controller(button.style)}><i className={className}>{button.labeled && button.label}</i></div>
  );
}

Button.propTypes ={
  button: PropTypes.object.isRequired,
  controller: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
