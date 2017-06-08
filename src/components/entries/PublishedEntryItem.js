import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const PublishedEntryItem = ({data, changeVisibility}) => {
    const classEye = `icon-eye icon-click fa fa-${ (data.visible)
        ? 'eye'
        : 'eye-slash'}`;
    const classHexagon = `hexagon ${ (data.visible)
        ? ''
        : 'hexagon-hidden'}`;
    const entryPath = `/entries/published/${data.id}`;
    return (
        <div className="published-entry-item">
            <div className={classHexagon}><i className={classEye} onClick={function() {
            changeVisibility(data.id, !data.visible)
        }}/></div>
            <div className="published-entry-item--info">
                <h5>{data.title}</h5>
                <div className="row">
                    <div>
                        <i className="fa fa-user"/> {data.author}
                    </div>
                    <div>
                        <i className="fa fa-calendar"/> {data.date}
                    </div>
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

export default PublishedEntryItem;
