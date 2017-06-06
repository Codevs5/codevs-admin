import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { remote } from 'electron';

import * as firebase from 'firebase';

import HeaderContainer from './HeaderContainer';
import EditorContainer from './EditorContainer';

import '../styles/__main.scss';

class AppContainer extends Component{
  constructor(props){
    super(props);
    const currentWin = remote.getCurrentWindow();
    this.state = {
      id: currentWin.postId,
      editorState : EditorState.createEmpty(),
    }
  }

  _fillState(){

  }

  render(){
    return (
      <div>
        <HeaderContainer id={this.state.id}/>
        <EditorContainer editorState={this.state.editorState}/>
      </div>
    );
  }
}

export default AppContainer;
