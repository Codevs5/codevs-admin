import React, {PropTypes} from 'react';
import ValidatorEntryContainer from '../../../containers/ValidatorEntryContainer.js';
import LoadingList from '../../layout/LoadingList.js';

const ValidatorEntriesList = ({loading, entries}) => {
    if (loading)
        return (<LoadingList/>);
    else
        return (
            <div className="validator-list">

                {entries.map((entry, i) => (<ValidatorEntryContainer entry={entry} key={i}/>))}
            </div>
        );
    }
;
ValidatorEntriesList.propTypes = {
    entries: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default ValidatorEntriesList;
