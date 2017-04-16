import React, {Component, PropTypes} from 'react';
import * as firebase from 'firebase';

import TagInput from '../form/TagInput.js';
import SimpleSelect from '../form/SimpleSelect.js';
import EntryTagList from './EntryTagList.js';

export default class ExpandedEntryInfo extends Component {
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
            }
        });

    }

    render() {
        const data = this.props.data;
        const info = (this.props.visible)
            ? 'entry-item-expanded'
            : 'hidden';
        return (
            <div className={info}>
                <div className="entry-item-expanded--data row">
                    <p><span className="label"><i className="fa fa-user"/>Author:</span> {data.author}</p>
                    <p><span className="label"><i className="fa fa-calendar"/>Date:</span>{data.date}</p>
                    <p><span className="label"><i className="fa fa-globe"/>URL:</span>{data.url}</p>
                </div>
                <EntryTagList tags={this.state.tags} handleRemove={this.handleTagRemoved} label="Tag list:"/>
                <TagInput title="Add new tag:" handleTagAdded={this.handleTagAdded}/>
            </div>
        );
    }
}

ExpandedEntryInfo.propTypes = {
    data: PropTypes.shape({title: PropTypes.string, visible: PropTypes.bool, author: PropTypes.string, url: PropTypes.string, id: PropTypes.string.isRequired}),
    visible: PropTypes.bool.isRequired
}
