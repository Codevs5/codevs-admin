import React, {Component, PropTypes} from 'react';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

import { fetchEntries, updateEntry } from '../actions/publishedEntriesActions';

import PublishedEntries from '../components/entries/PublishedEntries';
import LoadingList from '../components/layout/LoadingList';
import ErrorComponent from '../components/layout/ErrorComponent';

class PublishedEntriesContainer extends Component {
    constructor(props) {
        super(props);
        this.changeVisibility = (id, visible) => this._changeVisibility(id, visible);
    }

    componentDidMount() {
        this.props.dispatch(fetchEntries());
    }
    _changeVisibility(id, visible) {
        this.props.dispatch(updateEntry(id, {visible: visible}));
    }

    render() {
      if (this.props.loading) {
          return (<LoadingList/>);
      } else if (this.props.error) {
          return (
              <ErrorComponent />
          );
      }else{
        return (<PublishedEntries
          entries={this.props.publishedEntries}
          changeVisibility={this.changeVisibility}
          />);
      }
    }
}

const mapStateToProps = (state, props) => ({
      publishedEntries: state.publishedEntries,
      loading: state.status.loading,
      error: state.status.error
});

export default connect(mapStateToProps)(PublishedEntriesContainer);
