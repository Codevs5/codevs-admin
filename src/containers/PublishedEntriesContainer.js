import React, {Component, PropTypes} from 'react';
import PublishedEntries from '../components/entries/PublishedEntries.js';
import * as firebase from 'firebase';

export default class PublishedEntriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: []
        };
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('/entries');
        dbRef.orderByChild('date').once('value', (data) => {
            data = data.val();
            let items = []
            for (let key in data) {
                items.push({
                    title: data[key].title,
                    author: data[key].author,
                    visible: data[key].visible,
                    url: data[key].url,
                    id: key,
                    date: data[key].date
                });
            }
            this.setState({entries: items});
        });
    }

    changeVisibility(id, visible) {
        const dbRef = firebase.database().ref(`/entries/${id}`);
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
          />);
    }
}
