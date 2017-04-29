import React, {Component, PropTypes} from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import Header from '../components/layout/Header.js';
import EntryValidateSelectBox from '../components/entries/validator/EntryValidateSelectBox.js';
import ValidatorEntriesList from '../components/entries/validator/ValidatorEntriesList.js';


import { getValidatorEntries } from '../actions/validatorEntriesActions.js';

import '../style/__validator.scss';

class ValidatorEntriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accepted: false,
            declined: true,
            pending: true,
        }
        this.handleShowEntryType = this.handleShowEntryType.bind(this);


    }

    handleShowEntryType(type) {
        let toggledValue = {};
        toggledValue[type] = !this.state[type];
        //toggledValue['loading'] = true;
        this.setState(Object.assign({}, this.state, toggledValue));
    }

    componentDidMount() {
      const uid = firebase.auth().currentUser.uid;

          this.props.dispatch(getValidatorEntries(uid))

    }
filterEntries() {
    return this.props.entries.filter((entry, i) =>
    (entry.state === 'pending' && this.state.pending)
    || (entry.state === 'declined' && this.state.declined)
    || (entry.state === 'accepted' && this.state.accepted)
    || (!this.state.accepted && !this.state.declined && !this.state.pending)
  )
}

    render() {

        const entryTypes = [
            {
                type: 'accepted',
                description: 'Accepted entries',
                selected: this.state.accepted,
                icon: 'fa fa-check'
            }, {
                type: 'declined',
                description: 'Declined entries',
                selected: this.state.declined,
                icon: 'fa fa-ban'
            }, {
                type: 'pending',
                description: 'Pending entries',
                selected: this.state.pending,
                icon: 'fa fa-hourglass-end'
            }
        ];

        return (
            <div className="container">
                <Header title="Validator entries"/>
                <div className="validator-container">
                    <EntryValidateSelectBox handleToggle={this.handleShowEntryType} entryTypes={entryTypes}/>
                    <ValidatorEntriesList entries={this.filterEntries()} loading={this.props.loading}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, action) => {
  return {
    entries: state.validatorEntries,
    loading: state.status.loading,
    error: state.status.error,
    user: state.user
  }
};

export default connect(mapStateToProps)(ValidatorEntriesContainer);
