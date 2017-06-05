import React, { Component } from 'react';
import {EditorState, RichUtils, CompositeDecorator} from 'draft-js';

import EditorUI from '../components/EditorUI';
import Tag from '../components/Tag';

import styleMap from '../styles/EditorStyleMap';

class EditorContainer extends Component{
  constructor(props){
    super(props);
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: tagHandle,
        component: Tag
      }
    ]);

    this.state = {
      editorState : EditorState.createEmpty(compositeDecorator),
    }



    this.editorOnChange = this.editorOnChange.bind(this);
    this._onInlineClick = this._onInlineClick.bind(this);
    this._promptForLink = this._promptForLink.bind(this);
    this._toggleBlockType = this._toggleBlockType.bind(this);
    this._onTab = this._onTab.bind(this);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  }

  _onInlineClick(style) {
    this.editorOnChange(RichUtils.toggleInlineStyle(this.state.editorState, style.toUpperCase()));
  }

  _onTab(e) {
      console.log('tab');
       const maxDepth = 4;
       this.editorOnChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _promptForLink(e){
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    if(!selection.isCollapsed()){
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
       const linkInstance = contentState.getEntity(linkKey);
       url = linkInstance.getData().url;
     }
     console.log(startKey, startOffset, linkKey, url);
    }
  }

  _toggleBlockType(blockType) {
    this.editorOnChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  editorOnChange(editorState){
    this.setState({editorState});
  }
  render(){
    const buttons = {
      block: {
        items: BLOCK_TYPES,
        controller: this._toggleBlockType
      },
      inline: {
        items: INLINE_STYLES,
        controller: this._onInlineClick
      }
    };

    return(
      <EditorUI
        buttons={buttons}
        editorState={this.state.editorState}
        editorOnChange={this.editorOnChange}
        styleMap={styleMap}
        blockStyle={getBlockStyle}
        onTab={this._onTab}
        handleKeyCommand={this.handleKeyCommand}
        />
    );
  }
}

export default EditorContainer;

const TAG_REGEX = /\#[\w]+/g;
function tagHandle(contentBlock, callback) {
  findWithRegex(TAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr,
    start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'blockquote';
    default:
      return null;
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon: 'style-btn fa fa-header'},
  {label: 'H2', style: 'header-two', icon: 'style-btn fa fa-header'},
  {label: 'H3', style: 'header-three', icon: 'style-btn fa fa-header'},
  {label: 'H4', style: 'header-four', icon: 'style-btn fa fa-header'},
  {label: 'H5', style: 'header-five', icon: 'style-btn fa fa-header'},
  {label: 'H6', style: 'header-six', icon: 'style-btn fa fa-header'},
  {label: 'Blockquote', style: 'blockquote', icon: 'style-btn fa fa-quote-right'},
  {label: 'UL', style: 'unordered-list-item', icon: 'style-btn fa fa-list-ul'},
  {label: 'OL', style: 'ordered-list-item', icon: 'style-btn fa fa-list-ol'},
  {label: 'Code Block', style: 'code-block', icon: 'style-btn fa fa-code'},
];

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', icon: 'style-btn fa fa-bold'},
  {label: 'Italic', style: 'ITALIC', icon: 'style-btn fa fa-italic'},
  {label: 'Underline', style: 'UNDERLINE', icon: 'style-btn fa fa-underline'},
  {label: 'Monospace', style: 'CODE', icon: 'style-btn fa fa-hashtag'},
];
