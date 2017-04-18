import React, { Component, PropTypes } from 'react';

import ValidatorEntry from '../components/entries/validator/ValidatorEntry.js';

import {postNewReviewer, postUpdateReview} from '../utils/validatorEntriesData.js';

export default class ValidatorEntryContainer extends Component{
  constructor(props){
    super(props);
    const tmpEntry = this.props.entry;
    const tmpReviewers = this.props.entry.reviewers
    delete tmpEntry.reviewers;
    this.state = {
      expanded: false,
      reviewers: tmpReviewers,
      entryResume: tmpEntry
    };
    this.handleVisible = this.handleVisible.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleAddReviewer = this.handleAddReviewer.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.openInBrowser = this.openInBrowser.bind(this);
  }

  componentWillReceiveProps(newProps){

    console.log(newProps);
    this.setState(Object.assign({}, this.state, {entryResume: tmpEntry, reviewers: newProps.reviewers}));
  }

  handleVisible(){
    this.setState({expanded: !this.state.expanded});
  }

  handleReviewChange(e){
    console.log('Review change', this.state.entryResume.title, e.target.value);
  }

  handlePublish(){
    console.log('Publish entry',this.state.entryResume.title);
  }

  handleAddReviewer(){
    console.log('Add reviewer',this.state.entryResume.title);
  }

  openInBrowser(url){

  }

  render(){
    const options = ['accepted', 'declined', 'reviewing', 'notreviewing'];
    return (
      <ValidatorEntry
        visible={this.state.expanded}
        reviewers={this.state.reviewers}
        entryResume={this.state.entryResume}
        handleVisible={this.handleVisible}
        handlePublish={this.handlePublish}
        handleAddReviewer={this.handleAddReviewer}
        handleReviewChange={this.handleReviewChange}
        options={options}
        openInBrowser={this.openInBrowser}
        />
    );
  }
}

ValidatorEntryContainer.propTypes = {
  entry : PropTypes.object.isRequired
}
