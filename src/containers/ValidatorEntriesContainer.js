import React, {Component, PropTypes} from 'react';
import * as firebase from 'firebase';

import Header from '../components/layout/Header.js';
import EntryValidateSelectBox from '../components/entries/validator/EntryValidateSelectBox.js';
import ValidatorEntriesList from '../components/entries/validator/ValidatorEntriesList.js';

import {getEntries} from '../utils/validatorEntriesData.js';
import '../style/__validator.scss';
export default class ValidatorEntriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            accepted: false,
            declined: true,
            pending: true,
            loading: true
        }
        this.handleShowEntryType = this.handleShowEntryType.bind(this);
        this.fillStateWithEntries = this.fillStateWithEntries.bind(this);
        this.updateStateEntries = this.updateStateEntries.bind(this);

    }

    handleShowEntryType(type) {
        let toggledValue = {};
        toggledValue[type] = !this.state[type];
        toggledValue['loading'] = true;
        this.setState(Object.assign({}, this.state, toggledValue));
        this.fillStateWithEntries();
    }

    componentDidMount() {
        this.fillStateWithEntries();
    }

    fillStateWithEntries() {
        const user = firebase.auth().currentUser;
        const dbRef = firebase.database().ref(`/admins/${user.uid}`);

        dbRef.once('value')
              .then(snap => snap.val())
              .then(data => getEntries(data.key, this.state.pending, this.state.declined, this.state.accepted))
              .then(res => this.updateStateEntries(res))
              .catch(err => console.log(err)); //TODO: Gestionar bien el error con un modal o alguna hostia
    }

    updateStateEntries(data) {
        this.setState({
            entries: [
                ...data.pending || [],
                ...data.accepted || [],
                ...data.declined || []
            ],
            loading: false
        });
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
                    <ValidatorEntriesList entries={this.state.entries} loading={this.state.loading}/>
                </div>
            </div>
        );
    }
}
