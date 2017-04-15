import React, {PropTypes} from 'react';

const EntryItem = ({data, changeVisibility}) => {
    const visibilityClass = `fa fa-${ (data.visible)? 'eye' : 'eye-slash'}`;
    return (
        <div className="entry-item">
            <h3>{data.title}</h3>
            <p>
                {data.author}</p>
            <i className={visibilityClass} onClick={function() {
                changeVisibility(data.id, !data.visible)
            }}/>

        </div>
    );
}

EntryItem.propTypes = {
    data: PropTypes.shape({title: PropTypes.string, visible: PropTypes.bool, author: PropTypes.string, url: PropTypes.string}),
    changeVisibility: PropTypes.func.isRequired
};

export default EntryItem;
