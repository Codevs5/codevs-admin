import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import Header from '../layout/Header.js';

import '../../style/__published.scss';

const PublishedEntries = ({changeVisibility, entries}) => (
  <div className="container ">
    <Header title="Entries"/>
    <div className="published-list container-wHeader">
      {entries.map((entry, i) => <PublishedEntryItem data={entry} key={i} changeVisibility={changeVisibility}/>)}
    </div>
  </div>
);

PublishedEntries.propTypes = {
  changeVisibility: PropTypes.func.isRequired,
  entries: PropTypes.array.isRequired
}

export default PublishedEntries;

const PublishedEntryItem = ({data, changeVisibility}) => {
    const classEye = `icon-eye icon-click fa fa-${ (data.visible)
        ? 'eye'
        : 'eye-slash'}`;
    const classHexagon = `hexagon ${ (data.visible)
        ? ''
        : 'hexagon-hidden'}`;
    const entryPath = `/entries/published/${data.id}`;
    if(!data.title) return (null); //Hide titleless entries
    return (
        <div className="published-entry-item">
            <div className={classHexagon}><i className={classEye} onClick={function() {
            changeVisibility(data.id, !data.visible)
        }}/></div>
            <div className="published-entry-item--info">
                <h5>{data.title}</h5>
                <div className="row">
                    <div>
                        <i className="fa fa-user"/> {data.author.name}
                    </div>
                  {
                    data.date
                    && (<div>
                          <i className="fa fa-calendar"/> {data.date}
                        </div>)
                  }
                </div>

            </div>
            <Link to={entryPath} className="view-more">
                View more
            </Link>
        </div>
    );
};

PublishedEntryItem.propTypes = {
    data: PropTypes.object.isRequired,
    changeVisibility: PropTypes.func.isRequired
};
