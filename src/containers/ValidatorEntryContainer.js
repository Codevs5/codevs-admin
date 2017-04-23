import React, {Component, PropTypes} from 'react';
import * as firebase from 'firebase';
import { shell } from 'electron';


import ValidatorEntry from '../components/entries/validator/ValidatorEntry.js';

import {postNewReviewer, postUpdateReview, getIdFromURL} from '../utils/validatorEntriesData.js';

export default class ValidatorEntryContainer extends Component {
    constructor(props) {
        super(props);
        const tmpEntry = this.props.entry;
        const tmpReviewers = this.props.entry.reviewers
        delete tmpEntry.reviewers;
        this.state = {
            expanded: false,
            reviewers: tmpReviewers,
            entryResume: tmpEntry,
            loading: false
        };
        this.handleVisible = this.handleVisible.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleAddReviewer = this.handleAddReviewer.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.openInBrowser = this.openInBrowser.bind(this);
    }

    handleVisible() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    handleReviewChange(e, reviewerId) {
        const user = firebase.auth().currentUser;
        const dbRef = firebase.database().ref(`/admins/${user.uid}`);
        this.setState({loading: true});

        const payload = {
            url: getIdFromURL(this.state.entryResume.url),
            id: reviewerId,
            state: e.target.value
        };

        dbRef.once('value')
          .then(snap => snap.val())
          .then(data => postUpdateReview(data.key, payload))
          .then(res => {
            console.log(res);

            const tmpReviewers = res.reviewers.slice()
            delete res.reviewers;
            this.setState({reviewers: tmpReviewers, entryResume: res});
        }).then(() => this.setState({loading: false})).catch((err) => console.log(err));
    }

    handlePublish() {
        console.log('Publish entry', this.state.entryResume.title);
    }

    handleAddReviewer() {
        console.log('Add reviewer', this.state.entryResume.title);
    }

    openInBrowser(url) {
      if(this.state.entryResume.url)
        shell.openExternal(this.state.entryResume.url);
    }

    render() {
        const options = ['accepted', 'declined', 'reviewing', 'notreviewing'];
        return (<ValidatorEntry uid={firebase.auth().currentUser.uid} visible={this.state.expanded} reviewers={this.state.reviewers} entryResume={this.state.entryResume} handleVisible={this.handleVisible} handlePublish={this.handlePublish} handleAddReviewer={this.handleAddReviewer} handleReviewChange={this.handleReviewChange} options={options} openInBrowser={this.openInBrowser} loading={this.state.loading}/>);
    }
}

ValidatorEntryContainer.propTypes = {
    entry: PropTypes.object.isRequired
}
