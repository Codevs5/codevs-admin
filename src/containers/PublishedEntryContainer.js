import React, {Component} from 'react';
import * as firebase from 'firebase';
import {shell, remote, ipcRenderer} from 'electron';
import {connect} from 'react-redux';

import {fetchEntries, updateEntry, uploadImage, deleteEntry} from '../actions/publishedEntriesActions.js';
import {ERROR_UPDATED} from '../constants/statusTypes.js';

import PublishedEntry from '../components/entries/PublishedEntryPage.js'
import ErrorComponent from '../components/layout/ErrorComponent.js';
import LoadingList from '../components/layout/LoadingList.js';

const defaultData = {
    "author": "Anonimo",
    "date": 0,
    "imgSrc": "",
    "pinned": false,
    "tags": [],
    "title": "No title",
    "visible": false
};
const YES = 0;
const NO = 1;

class PublishedEntryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: this.props.entries.filter((e) => e.id === props.match.params.id)[0] || defaultData,
      tags: [],
      titleEditable: false,
    };

    this.firstTitle = '';

    //Bindings!
    this.handleOpenBlog = () => this._handleOpenBlog();
    this.handleChangePinned = () => this.handleChangePinned();
    this.handleOpenEntry = () => this._handleOpenEntry();
    this.handleAddTag = (tag) => this._handleAddTag(tag);
    this.handleRemoveTag = (tag) => this._handleRemoveTag(tag);
    this.handleUpdateEntry = () => this._handleUpdateEntry();
    this.handleChangeVisibility = () => this._handleChangeVisibility();
    this.handleChangeTitle = (title) => this._handleChangeTitle(title);
    this.handleDeleteEntry = () => this._handleDeleteEntry();
    this.handleToggleEditable = () => this._handleToggleEditable();
    this.handleAddMainImg = (img) => this._handleAddMainImg(img);
  }

  componentWillMount() {
    //If entry is not downloaded yet
    if (Object.is(this.state.entry, defaultData)) {
      this.props.dispatch(fetchEntries());
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      entry: props.entries.filter((e) => e.id === props.match.params.id)[0] || defaultData
    })
  }

  _handleOpenBlog() {
    if (this.state.entry.id)
      shell.openExternal(`https://codevs.es/blog/${id}`);
  }

  _handleOpenEntry() {
    ipcRenderer.send('loadNewWin', {id: this.state.entry.id});
  }

  _handleChangeVisibility() {
    this.props.dispatch(updateEntry(this.state.entry.id, {
      visible: !this.state.entry.visible
    }));
  }

  _handleDeleteEntry() {
    const res = remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      buttons: [
        'Yes', 'No'
      ],
      title: 'Delete?',
      message: 'Are you sure you want to delete this entry?'
    });
    if(res === YES){
      this.props.dispatch(deleteEntry(this.state.entry.id, this.props.history));
    }
  }

  _handleChangePinned() {
    this.props.dispatch(updateEntry(this.state.entry.id, {
      pinned: !this.state.entry.pinned
    }));
  }

  _handleRemoveTag(value) {
    this.props.dispatch(updateEntry(this.state.entry.id,))
    const dbRef = firebase.database().ref(`/entries/info/${this.props.match.params.id}/tags`);
    dbRef.child(value).remove();
  }

  _handleAddTag(e) {
    if (e.key === 'Enter') {
      let tmpTag = {};
      tmpTag[e.target.value] = true;
      this.props.dispatch(updateEntry(this.state.entry.id, {tags: Object.assign({}, this.state.entry.tags, tmpTag)}));
    }
  }

  _handleChangeTitle(e) {
    this.setState({entry: Object.assign({}, this.state.entry, {title: e.target.value})});
  }

  _handleToggleEditable() {
    if (this.state.titleEditable && this.firstTitle !== this.state.entry.title) { //Save
      this.props.dispatch(updateEntry(this.state.entry.id, {title: this.state.entry.title}));
    }
    this.setState({
      titleEditable: !this.state.titleEditable
    });
  }

  _handleAddMainImg(e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.props.dispatch(uploadImage(this.state.entry.id, file));
  }



  render() {

    const btns = [
      {
        controller: this.handleOpenURL,
        title: 'Edit the file',
        icon: 'fa fa-edit',
        design: 'entry-btn-item green-sea'
      }, {
        controller: this.handleUpdateEntry,
        title: 'Update entry',
        icon: 'fa fa-upload',
        design: 'entry-btn-item green-sea'
      }, {
        controller: this.handleDeleteEntry,
        title: 'Delete the entry',
        icon: 'fa fa-trash',
        design: 'entry-btn-item alizarin'
      }, {
        controller: this.handleOpenBlog,
        title: 'Open the blog',
        icon: 'fa fa-globe',
        design: 'entry-btn-item belize-hole'
      }
    ];
    
    const toggles = [
      {
        controller: this.handleChangePinned,
        check: {
          iconUncheck: 'chain-broken',
          iconCheck: 'thumb-tack',
          checkMssg: 'Pinned',
          uncheckMssg: 'Unpinned',
          isCheck: this.state.entry.pinned
        }
      }, {
        controller: this.handleChangeVisibility,
        check: {
          iconCheck: 'eye',
          iconUncheck: 'eye-slash',
          checkMssg: 'Visible',
          uncheckMssg: 'Hidden',
          isCheck: this.state.entry.visible
          }
      }
    ];

    if (this.props.error) {
      return (<ErrorComponent/>);
    } else if (this.props.loading) {
      return (<LoadingList/>);
    } else {
      return (
        <PublishedEntry
          previous={this.props.history.goBack}
          titleEditable={this.state.titleEditable}
          handleChangeTitle={this.handleChangeTitle}
          handleEditableChange={this.handleToggleEditable}
          data={this.state.entry}
          errorUpdating={this.props.updated === ERROR_UPDATED}
          errorMessage={this.props.errorMessage}
          handleRemoveTag={this.handleRemoveTag}
          handleAddTag={this.handleAddTag}
          btns={btns}
          toggles={toggles}
          loadingImage={this.props.loadingImage}
          handleAddMainImg={this.handleAddMainImg}
        />);
      }
  }
}

const mapStateToProps = (state, action) => {
    return {
      entries: state.publishedEntries,
      loading: state.status.loading,
      error: state.status.error,
      loadingImage: state.status.loadingImage,
      updated: state.status.updated,
      errorMessage: state.status.errorMessage
    }
}

export default connect(mapStateToProps)(PublishedEntryContainer);
