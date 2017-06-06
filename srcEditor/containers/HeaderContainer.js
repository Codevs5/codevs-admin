import React, { Component } from 'react';

import HeaderUI from '../components/HeaderUI';

class HeaderContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
        saving : false,
    };

    this.autoSave = () => this._autoSave();
    this.save = () => this._save();
    this.autoSave();
  }

  _autoSave(){
    setInterval(() => this.save(), 30000);
  }

  _save(){
    this.setState({saving: true});
    setTimeout(() => this.setState({saving: false}), 3000);
    console.log('Guardando');
  }

  render(){
    return (<HeaderUI saving={this.state.saving} saveFn={this.save}/>);
  }
}

export default HeaderContainer;
