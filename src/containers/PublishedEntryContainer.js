import React, {Component} from 'react';
import * as firebase from 'firebase';
import { shell } from 'electron';

import PublishedEntry from '../components/entries/published/PublishedEntry.js'

export default class PublishedEntryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          entry : {
            imgSrc: '',
            pinned: false,
            visible: false
          },
          error: false,
          loading: true,
          titleEditable: false,
          errorUpdating: false,
          errorMessage: '',
          loadingImage: false,
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
        this.handleAddMainImg = this.handleAddMainImg.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.uploadError = this.uploadError.bind(this);
        this.uploadFinished = this.uploadFinished.bind(this);
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
      const tmpVisible = !this.state.entry.visible;
      this.setState({ entry: Object.assign({}, this.state.entry, {visible: tmpVisible})});
      const dbRef = firebase.database().ref(`/entries/info/${this.props.match.params.id}/`);
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

    handleAddMainImg(e){
      e.preventDefault();
      this.setState({loadingImage: true});
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
          const mainImgUpload = {
              file: file,
              imagePreviewUrl: reader.result
          };
          this.uploadImage(mainImgUpload);
      };
      reader.readAsDataURL(file);
    }

    uploadImage(mainImgUpload){
      const id = this.props.match.params.id;
      const stRef = firebase.storage().ref(`entries/${id}`);

      const metadata = {
          contentType: 'image/png'
      };
      const uploadTask = stRef.child('main.png').put(mainImgUpload.file, metadata);

      uploadTask
        .then(() => this.uploadFinished())
        .catch((err) => this.uploadError(err));
    }


    uploadError(e) {
        this.setState({error: false, loading: false, updated: 'fail', loadingAvatar: false});
        console.log(e);
    }

    uploadFinished() {
        const id = this.props.match.params.id;
        const dbRef = firebase.database().ref(`/entries/info/${id}/`);
        const stRef = firebase.storage().ref(`/entries/${id}/main.png`);
        stRef.getDownloadURL()
          .then((url) => dbRef.update({imgSrc: url})
          .then(() => url))
          .then((url) => {
            console.log('end');
            this.setState({error: false, loadingImage: false, loading: false, updated: ''});
            this.setState({entry: Object.assign({}, this.state.entry, {imgSrc: url})});
          }).catch((e) => {
            this.setState({updated: 'fail'});
            console.log(e);
        });
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
              loadingImage={this.state.loadingImage}
              handleAddMainImg={this.handleAddMainImg}
              />
        );
    }
}
