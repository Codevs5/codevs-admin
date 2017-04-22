import React, {Component, PropTypes} from 'react';
import PublishedEntries from '../components/entries/published/PublishedEntries.js';
import * as firebase from 'firebase';

export default class PublishedEntriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            loading: true,
            error: false
        };
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('/entries/info');
        dbRef.orderByChild('date').once('value')
        .then((data) => {
            data = data.val();
            let items = []
            for (let key in data) {
                items.push({
                    title: data[key].title,
                    author: data[key].author,
                    visible: data[key].visible,
                    id: key,
                    date: data[key].date
                });
            }
            this.setState({entries: items, loading: false});
        })
        .catch((err) => this.setState({error: true, loading: false}));
    }

    changeVisibility(id, visible) {
        const dbRef = firebase.database().ref(`/entries/info/${id}`);
        dbRef.update({visible: visible});
        const index = this.state.entries.findIndex(item => item.id === id);
        const size = this.state.entries.length;
        this.setState({
            entries: [
                ...this.state.entries.slice(0, index),
                Object.assign({}, this.state.entries[index], {visible}),
                ...this.state.entries.slice(index + 1, size)
            ]
        });
    }

    render() {
        return (<PublishedEntries
          entries={this.state.entries}
          changeVisibility={this.changeVisibility}
          loading={this.state.loading}
          error={this.state.error}
          />);
    }
}
