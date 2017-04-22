import React, {Component} from 'react';
import * as firebase from 'firebase';
import { shell } from 'electron';

import PublishedEntry from '../components/entries/published/PublishedEntry.js'

export default class PublishedEntryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          entry : {
            pinned: false,
            visible: false
          },
          error: false,
          loading: true,
          titleEditable: false,
          errorUpdating: false,
          errorMessage: ''
        };

        this.firstTitle = '';
        this.handleChangePinned = this.handleChangePinned.bind(this);
        this.handleOpenURL = this.handleOpenURL.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
        this.handleRemoveTag = this.handleRemoveTag.bind(this);
        this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
        this.handleChangeVisibility = this.handleChangeVisibility.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
        this.handleToggleEditable = this.handleToggleEditable.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const dbRef = firebase.database().ref(`/entries/info/${id}`);
        this.setState({loading: true});

        dbRef.on('value', (snap) => {
          const data = snap.val();
          data.tags = Object.keys(data.tags || {});
          this.setState({entry: Object.assign({}, this.state.entry, data), loading: false, error: false});
          this.firstTitle = this.state.entry.title;
        },
      (err) => this.setState({error: true, loading: false}));
    }

    handleOpenBlog(){
      if(this.state.entry.id)
        shell.openExternal(`https://codevs.es/${id}`);
    }

    handleOpenURL(){
      if(this.state.entry.url)
        shell.openExternal(this.state.entry.url);
    }

    handleUpdateEntry(){}

    handleChangeVisibility(){
      const tmpVisible = !this.state.entry.visibility;
      const dbRef = firebase.database().ref(`/entries/info/${this.props.match.params.id}/`);
      this.setState({ entry: Object.assign({}, this.state.entry, {pinned: tmpVisible})});
      dbRef.update({visible: tmpVisible})
           .then(() => this.setState({errorUpdating: false}))
           .catch(e => this.setState({errorUpdating: true, errorMessage: "Sorry, we couldn't update the entry"}))
    }

    handleDeleteEntry(){}

    handleChangePinned(){
      const tmpPinned = !this.state.entry.pinned;
      this.setState({ entry: Object.assign({}, this.state.entry, {pinned: tmpPinned})});
      const dbRef = firebase.database().ref(`/entries/info/${this.props.match.params.id}/`);
      dbRef.update({pinned: tmpPinned})
           .then(() => this.setState({errorUpdating: false}))
           .catch(e => this.setState({errorUpdating: true, errorMessage: "Sorry, we couldn't update the entry"}))
    }

    handleRemoveTag(value){
      const dbRef = firebase.database().ref(`/entries/info/${this.props.match.params.id}/tags`);
      dbRef.child(value).remove();
    }

    handleAddTag(e){
        if (e.key === 'Enter') {
          const dbRef = firebase.database().ref(`/entries/info/${this.props.match.params.id}/tags`);
          let newTag = {};
          newTag[e.target.value] = true;
          dbRef.update(newTag);
          e.target.value = "";
        }
    }

    handleChangeTitle(e){
      this.setState({ entry: Object.assign({}, this.state.entry, {title: e.target.value})});
    }

    handleToggleEditable(){

      if(this.state.titleEditable && this.firstTitle !== this.state.entry.title){//Save
        const dbRef = firebase.database().ref(`/entries/info/${this.props.match.params.id}`);
        dbRef.update({title: this.state.entry.title})
             .then(() => this.setState({errorUploading: false}))
             .catch((err) => this.setState({errorUpdating: true, errorMessage: "Ey, we could'nt update the title"}));
      }
      this.setState({titleEditable: !this.state.titleEditable})
    }

    render() {
        const btns = [
          {
            controller: this.handleOpenURL,
            title: 'Edit the file',
            icon: 'fa fa-edit',
            design: 'entry-btn-item green-sea'
          },
          {
            controller: this.handleUpdateEntry,
            title: 'Update entry',
            icon: 'fa fa-upload',
            design: 'entry-btn-item green-sea'
          },
          {
            controller: this.handleDeleteEntry,
            title: 'Delete the entry',
            icon: 'fa fa-trash',
            design: 'entry-btn-item alizarin'
          },
          {
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
          },
          {
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

        return (
            <PublishedEntry
              previous={this.props.history.goBack}
              loading={this.state.loading}
              error={this.state.error}
              titleEditable={this.state.titleEditable}
              handleChangeTitle={this.handleChangeTitle}
              handleEditableChange={this.handleToggleEditable}
              data={this.state.entry}
              errorUpdating={this.state.errorUpdating}
              errorMessage={this.state.errorMessage}
              handleRemoveTag={this.handleRemoveTag}
              handleAddTag={this.handleAddTag}
              tags={this.state.tags}
              btns={btns}
              toggles={toggles}
              />
        );
    }
}
