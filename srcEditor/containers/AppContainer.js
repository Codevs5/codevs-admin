import React, { Component } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { remote } from 'electron';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { startEntry, saveEntry } from '../actions/entryActions';

import HeaderContainer from './HeaderContainer';
import EditorContainer from './EditorContainer';

import '../styles/__main.scss';

class AppContainer extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    const currentWin = remote.getCurrentWindow();
    this.props.dispatch(startEntry(currentWin.postId));
    setInterval(() => this.props.dispatch(saveEntry()), 30000);
  }

  render(){
    return (
      <div>
        <HeaderContainer />
        <EditorContainer />
      </div>
    );
  }
}

export default connect()(AppContainer);
