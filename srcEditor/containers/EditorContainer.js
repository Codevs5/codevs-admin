import React, {Component} from 'react';
import {
  Entity,
  EditorState,
  RichUtils,
  CompositeDecorator,
  AtomicBlockUtils,
  convertToRaw
} from 'draft-js';
import {Map} from 'immutable';
import EditorUI from '../components/EditorUI';
import Tag from '../components/Tag';
import Media from '../components/Media';
import styleMap from '../styles/EditorStyleMap';
// import { composeDecorators } from 'draft-js-plugins-editor';
// import createResizeablePlugin from 'draft-js-resizeable-plugin';
// import createFocusPlugin from 'draft-js-focus-plugin';
//
// const resizeablePlugin = createResizeablePlugin();
// const focusPlugin = createFocusPlugin();
//
// const decorator = composeDecorators(
//   resizeablePlugin.decorator,
//   focusPlugin.decorator,
// );
//
// const plugins = [focusPlugin, resizeablePlugin];

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: tagHandle,
        component: Tag
      }
    ]);
    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator),
      showPrompt: false,
      urlType: '',
      urlValue: ''
    }
    //Function bindings
    this.editorOnChange = this.editorOnChange.bind(this);
    this._onInlineClick = this._onInlineClick.bind(this);
    this._promptForLink = this._promptForLink.bind(this);
    this._toggleBlockType = this._toggleBlockType.bind(this);
    this._onTab = this._onTab.bind(this);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.addAudio = this._addAudio.bind(this);
    this.addImage = this._addImage.bind(this);
    this.addVideo = this._addVideo.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
    this.handleReturn = this._handleReturn.bind(this);
  }

  _onInlineClick(style) {
    this.editorOnChange(RichUtils.toggleInlineStyle(this.state.editorState, style.toUpperCase()));
  }
  _onTab(e) {
    console.log('tab');
    const maxDepth = 4;
    this.editorOnChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  _promptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
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
    this.editorOnChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.editorOnChange(newState);
      return true;
    }
    return false;
  }

  _handleReturn(e) {
    const {editorState} = this.state
    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
      const currentBlock = getCurrentBlock(editorState)
      const blockType = currentBlock.getType()
      if (blockType.indexOf('atomic') === 0) {
        const selectionState = editorState.getSelection();
        if (selectionState.isCollapsed()) {
          console.log(selectionState.getAnchorOffset(), window.getSelection().anchorOffset)
        }
        this.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
        return true
      }
      return false
    }
    return false
  }
  //Media handler
  _confirmMedia(e) {
    e.preventDefault();
    console.log('click');
    const {editorState, urlValue, urlType} = this.state;
    const entityKey = Entity.create(urlType, 'IMMUTABLE', {src: urlValue})
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' '),
      showPrompt: false,
      urlValue: ''
    }, () => {
      //setTimeout(() => this.focus(), 0);
    });
  }
  _onURLInputKeyDown(e) {
    console.log(e.which);
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }
  _promptForMedia(type) {
    const {editorState} = this.state;
    this.setState({
      showPrompt: true,
      urlValue: '',
      urlType: type
    }, () => {
      //setTimeout(() => this.refs.url.focus(), 0);
    });
  }
  _addAudio() {
    this._promptForMedia('audio');
  }
  _addImage() {
    console.log('image');
    this._promptForMedia('image');
  }
  _addVideo() {
    this._promptForMedia('video');
  }
  //Main function to handle any change on the editor
  editorOnChange(editorState) {
    this.setState({editorState});
  }
  render() {
    const buttons = {
      block: {
        items: BLOCK_TYPES,
        controller: this._toggleBlockType
      },
      inline: {
        items: INLINE_STYLES,
        controller: this._onInlineClick
      },
      image: {
        controller: this.addImage,
        onURLChange: this.onURLChange,
        confirmMedia: this.confirmMedia,
        urlValue: this.state.urlValue,
        showPrompt: this.showPrompt,
        onURLInputKeyDown: this.onURLInputKeyDown,
        addImage: this.addImage
      }
    };

    return (<EditorUI
      buttons={buttons}
      editorState={this.state.editorState}
      editorOnChange={this.editorOnChange}
      styleMap={styleMap}
      blockStyle={getBlockStyle}
      onTab={this._onTab}
      handleKeyCommand={this.handleKeyCommand}
      handleReturn={this.handleReturn}
      showPrompt={this.state.showPrompt}
      />);
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
    case 'atomic':
      return {component: Media, editable: false};
    default:
      return null;
  }
}
const addNewBlockAt = (editorState, pivotBlockKey, newBlockType = 'unstyled', initialData = {}) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const block = blockMap.get(pivotBlockKey);
  const blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
  const blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
  const newBlockKey = genKey();
  const newBlock = new ContentBlock({
    key: newBlockKey,
    type: newBlockType,
    text: '',
    characterList: block.getCharacterList().slice(0, 0),
    depth: 0,
    data: Map(initialData)
  });
  const newBlockMap = blocksBefore.concat([
    [
      pivotBlockKey, block
    ],
    [newBlockKey, newBlock]
  ], blocksAfter).toOrderedMap();
  const selection = editorState.getSelection();
  const newContent = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({anchorKey: newBlockKey, anchorOffset: 0, focusKey: newBlockKey, focusOffset: 0, isBackward: false})
  });
  console.log(newContent);
  console.log('aaa');
  return EditorState.push(editorState, newContent, 'split-block');
};

const getCurrentBlock = (editorState) => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selectionState.getStartKey());
  return block;
};


//Buttons types
const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon: 'style-btn fa fa-header', labeled: true},
  {label: 'H2', style: 'header-two', icon: 'style-btn fa fa-header', labeled: true},
  // {label: 'H3', style: 'header-three', icon: 'style-btn fa fa-header'},
  // {label: 'H4', style: 'header-four', icon: 'style-btn fa fa-header'},
  // {label: 'H5', style: 'header-five', icon: 'style-btn fa fa-header'},
  // {label: 'H6', style: 'header-six', icon: 'style-btn fa fa-header'},
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
