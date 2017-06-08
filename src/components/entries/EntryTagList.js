import React, {PropTypes} from 'react';
import EntryTag from './EntryTag.js';
import '../../style/__tags.scss';

const parseTags = (tags) => Array.isArray(tags)?tags:Object.keys(tags);

const EntryTagList = ({handleRemove, tags, label}) => {
    let tagList;
    if(parseTags(tags).length >= 1) tagList = parseTags(tags).map((tag, i) => <EntryTag handleRemove={handleRemove} value={tag} key={i}/>);
    else tagList = (<div className="empty-list"> There are not tags to show. Try adding one. </div>);
    return (
        <div className="tag-container">
            {label}
            <ul className="tag-list">
                {tagList}
            </ul>
        </div>
    );
}

EntryTagList.propTypes = {
    handleRemove: PropTypes.func.isRequired,
    tags: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    label: PropTypes.string
};

export default EntryTagList;
