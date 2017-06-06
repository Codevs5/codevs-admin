import React, { Component } from 'react';

import HeaderContainer from './HeaderContainer';
import EditorContainer from './EditorContainer';

import '../styles/__main.scss';

class AppContainer extends Component{
  constructor(props){
    super(props);
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

export default AppContainer;
