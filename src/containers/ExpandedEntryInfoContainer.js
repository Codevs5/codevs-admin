import React, {Component, PropTypes} from 'react';
import * as firebase from 'firebase';

import ExpandedEntryInfo from '../components/entries/ExpandedEntryInfo.js';

export default class ExpandedEntryInfoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
        this.handleTagAdded = this.handleTagAdded.bind(this);
        this.handleTagRemoved = this.handleTagRemoved.bind(this);
    }

    handleTagAdded(e) {
        if (e.key === 'Enter') {
            const dbRef = firebase.database().ref(`/entries/${this.props.data.id}/tags`);
            let newTag = {};
            newTag[e.target.value] = true;
            dbRef.update(newTag);
            e.target.value = "";
        }
    }

    handleTagRemoved(value) {
        // this.setState({
        //   tags: this.state.tags.filter((el, i) => el !== value)
        // });
        const dbRef = firebase.database().ref(`/entries/${this.props.data.id}/tags`);
        dbRef.child(value).remove();
    }

    componentDidMount() {
        const dbRef = firebase.database().ref(`/entries/${this.props.data.id}/tags`);
        dbRef.on('value', (snap) => {
            if (snap.val()) {
                const tags = Object.keys(snap.val());
                this.setState({tags});
            }else{
              this.setState({tags: []})
            }
        });

    }

    render() {
        const data = this.props.data;
        const info = (this.props.visible)
            ? 'entry-item-expanded'
            : 'hidden';
        return (<ExpandedEntryInfo
          handleTagAdded={this.handleTagAdded}
          handleTagRemoved={this.handleTagRemoved}
          data={this.props.data}
          info={info}
          tags={this.state.tags}
          />);
    }
}

ExpandedEntryInfoContainer.propTypes = {
    data: PropTypes.shape({title: PropTypes.string, visible: PropTypes.bool, author: PropTypes.string, url: PropTypes.string, id: PropTypes.string.isRequired}),
    visible: PropTypes.bool.isRequired
}
