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
          entries={this.props.publishedEntries}
          changeVisibility={this.changeVisibility}
          loading={this.props.status.loading}
          error={this.props.status.error}
          />);
    }
}

const mapStateToProps = (state, props) => {
    return {
      publishedEntries: state.publishedEntries,
      status: state.status
    };
};

export default connect(mapStateToProps)(PublishedEntriesContainer);
