import React, {Component, PropTypes} from 'react';
import * as firebase from 'firebase';
import { shell } from 'electron';
import { connect } from 'react-redux';

import ValidatorEntry from '../components/entries/validator/ValidatorEntry.js';

import { changeReview } from '../actions/validatorEntriesActions.js';
import {postNewReviewer, postUpdateReview, getIdFromURL} from '../utils/validatorEntriesData.js';

class ValidatorEntryContainer extends Component {
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

    componentWillReceiveProps(props){
      const tmpEntry = props.entry;
      const tmpReviewers = props.entry.reviewers
      delete tmpEntry.reviewers;
      this.setState({
          ...this.state,
          expanded: false,
          reviewers: tmpReviewers,
          entryResume: tmpEntry
      });
    }


    handleVisible() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    handleReviewChange(e, reviewerId) {
        const uid = firebase.auth().currentUser.uid;
        const payload = {
            url: getIdFromURL(this.state.entryResume.url),
            id: reviewerId,
            state: e.target.value
        };
        console.log('ue');
        this.props.dispatch(changeReview(uid, payload));
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
      const options = [
          {
              opt: 'accepted',
              label: 'Aceptada'
          }, {
              opt: 'declined',
              label: 'Rechazada'
          }, {
              opt: 'reviewing',
              label: 'Pendiente'
          }, {
              opt: 'notreviewing',
              'label': 'Sin revisar'
          }
      ];
        return (<ValidatorEntry
          uid={firebase.auth().currentUser.uid}
          visible={this.state.expanded}
          reviewers={this.state.reviewers || []}
          entryResume={this.state.entryResume}
          handleVisible={this.handleVisible}
          handlePublish={this.handlePublish}
          handleAddReviewer={this.handleAddReviewer}
          handleReviewChange={this.handleReviewChange}
          options={options}
          openInBrowser={this.openInBrowser}
          loading={this.props.loading}/>);
    }
}

ValidatorEntryContainer.propTypes = {
    entry: PropTypes.object.isRequired
}

const mapStateToProps = (state, action) => ({
    entries: state.validatorEntries,
    loading: state.status.loading,
    error: state.status.error
});

export default connect(mapStateToProps)(ValidatorEntryContainer);
