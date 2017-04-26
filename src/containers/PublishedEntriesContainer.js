import React, {Component, PropTypes} from 'react';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

import PublishedEntries from '../components/entries/published/PublishedEntries.js';
import {fetchEntries, updateEntry} from '../actions/publishedEntriesActions.js';

class PublishedEntriesContainer extends Component {
    constructor(props) {
        super(props);
        this.changeVisibility = this.changeVisibility.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(fetchEntries());
    }
    changeVisibility(id, visible) {
        this.props.dispatch(updateEntry(id, {visible: visible}));
    }

    render() {
        return (<PublishedEntries
          entries={this.props.publishedEntries.entries}
          changeVisibility={this.changeVisibility}
          loading={this.props.publishedEntries.fetching}
          error={this.props.publishedEntries.error}
          />);
    }
}

const mapStateToProps = (state, props) => {
    return {
      publishedEntries: state.publishedEntries
    };
};

export default connect(mapStateToProps)(PublishedEntriesContainer);
