import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { saveTitle, saveEntry } from '../actions/entryActions';
import HeaderUI from '../components/HeaderUI';

class HeaderContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      titleEditable: false
    };
    this.handleToggleEditable = () => this._handleToggleEditable();
    this.handleChangeTitle = (e) => this._handleChangeTitle(e);
    this.save = () => this.props.dispatch(saveEntry());
  }

  _handleChangeTitle(e) {
      this.setState({title: e.target.value});
  }

  _handleToggleEditable() {
      if (this.state.titleEditable) { //Save
          this.props.dispatch(saveTitle(this.props.id, this.state.title));
      }
      this.setState({
          titleEditable: !this.state.titleEditable
      });
  }

  render(){
    return (<HeaderUI
      saving={this.props.loading}
      saveFn={this.save}
      title={this.state.title}
      handleToggleEditable={this.handleToggleEditable}
      handleChangeTitle={this.handleChangeTitle}
      editing={this.state.titleEditable}
      />);
  }
}
const mapStateToProps = (state, action) => ({
  id: state.entry.id,
  title : state.entry.title,
  loading: state.status.loading,
});

export default connect(mapStateToProps)(HeaderContainer);
