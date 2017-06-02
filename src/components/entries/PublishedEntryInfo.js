import React, {PropTypes} from 'react';

const PublishedEntryInfo = ({data}) => (
    <div className="entry-info">
        <EntryItem value={data.date} label="Published:" icon="fa fa-calendar"/>
        <EntryItem value={data.author} label="Author:" icon="fa fa-user"/>
        <EntryItem value="1000" label="Views:" icon="fa fa-eye"/>
        <EntryItem value="879" label="Favs:" icon="fa fa-heart"/>
        <EntryItem value="24" label="Comments:" icon="fa fa-commenting-o"/>
        <EntryItem value="211" label="Shared:" icon="fa fa-share-alt-square"/>
    </div>
);

PublishedEntryInfo.propTypes = {
    data: PropTypes.object.isRequired
};

export default PublishedEntryInfo;

const EntryItem = ({value, icon, label}) => (
    <div className="entry-info--item">
        <span>
            <i className={icon}/> {label}
        </span>
        &nbsp;{value}
    </div>
);

EntryItem.propTypes = {
    value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}
