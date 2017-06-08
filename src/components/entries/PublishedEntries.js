import React, {PropTypes} from 'react';

import PublishedEntryItem from './PublishedEntryItem.js';
import Header from '../layout/Header.js';
import LoadingList from '../layout/LoadingList.js';
import ErrorComponent from '../layout/ErrorComponent.js';

import '../../style/__published.scss';

const PublishedEntries = ({changeVisibility, entries, loading, error}) => {

    if (loading) {
        return (<LoadingList/>);
    } else if (error) {
        return (
            <ErrorComponent />
        );
    } else {
        return (
            <div className="container ">
                <Header title="Entries"/>
                <div className="published-list container-wHeader">
                    {entries.map((entry, i) => <PublishedEntryItem data={entry} key={i} changeVisibility={changeVisibility}/>)}
                </div>
            </div>
        );
    }
};

PublishedEntries.propTypes = {
    changeVisibility: PropTypes.func.isRequired,
    entries: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
}

export default PublishedEntries;
