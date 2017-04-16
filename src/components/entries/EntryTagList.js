import React, {PropTypes} from 'react';
import EntryTag from './EntryTag.js';
import '../../style/__tags.scss';

const EntryTagList = ({handleRemove, tags, label}) => {
    const tagList = tags.map((tag, i) => <EntryTag handleRemove={handleRemove} value={tag} key={i}/>);
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
    tags: PropTypes.array.isRequired,
    label: PropTypes.string
};

export default EntryTagList;
