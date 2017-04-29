import React, {Component} from 'react';
import * as firebase from 'firebase';
import {shell} from 'electron';
import {connect} from 'react-redux';

import {fetchEntries, updateEntry, uploadImage} from '../actions/publishedEntriesActions.js';
import {ERROR_UPDATED} from '../constants/statusTypes.js';

import PublishedEntry from '../components/entries/published/PublishedEntry.js'

const defaultData = {
    "author": "Anonimo",
    "date": 0,
    "imgSrc": "",
    "pinned": false,
    "tags": [],
    "title": "No title",
    "visible": false
};

class PublishedEntryContainer extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            entry: this.props.entries.filter((e) => e.id === props.match.params.id)[0] || defaultData,
            tags: [],
            titleEditable: false,

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

    }

    componentWillMount() {
        if (Object.is(this.state.entry, defaultData)) {
            this.props.dispatch(fetchEntries());
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            entry: props.entries.filter((e) => e.id === props.match.params.id)[0] || defaultData
        })
    }

    handleOpenBlog() {
        if (this.state.entry.id)
            shell.openExternal(`https://codevs.es/${id}`);
        }

    handleOpenURL() {
        if (this.state.entry.url)
            shell.openExternal(this.state.entry.url);
        }

    handleUpdateEntry() {}

    handleChangeVisibility() {
        this.props.dispatch(updateEntry(this.state.entry.id, {
            visible: !this.state.entry.visible
        }));
    }

    handleDeleteEntry() {}

    handleChangePinned() {
        this.props.dispatch(updateEntry(this.state.entry.id, {
            pinned: !this.state.entry.pinned
        }));
    }

    handleRemoveTag(value) {
        this.props.dispatch(updateEntry(this.state.entry.id,))
        const dbRef = firebase.database().ref(`/entries/info/${this.props.match.params.id}/tags`);
        dbRef.child(value).remove();
    }

    handleAddTag(e) {
        if (e.key === 'Enter') {
            let tmpTag = {};
            tmpTag[e.target.value] = true;
            this.props.dispatch(updateEntry(this.state.entry.id, {tags: Object.assign({}, this.state.entry.tags, tmpTag)}));
        }
    }

    handleChangeTitle(e) {
        this.setState({entry: Object.assign({}, this.state.entry, {title: e.target.value})});
    }

    handleToggleEditable() {
        if (this.state.titleEditable && this.firstTitle !== this.state.entry.title) { //Save
            this.props.dispatch(updateEntry(this.state.entry.id, {title: this.state.entry.title}));
        }
        this.setState({
            titleEditable: !this.state.titleEditable
        });
    }

    handleAddMainImg(e) {
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
        console.log(this.props);
        return (<PublishedEntry
          previous={this.props.history.goBack}
          loading={this.props.loading}
          error={this.props.error}
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
          handleAddMainImg={this.handleAddMainImg}/>);
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
