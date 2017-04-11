import React from 'react';
import {Link} from 'react-router-dom';

export const MenuItem = ({info, handleActive}) => {
    const classIcon = `fa fa-${info.iconName}`;
    const classItem = `menu-item ${ (info.isActive)
        ? 'current'
        : ''}`;
    return (
        <Link to={info.path} onClick={function(e) {
            handleActive(e, info.path)
        }} className={classItem}>
            <i className={classIcon}/>
            <p>
                {info.name}
            </p>
        </Link>
    )
}

MenuItem.propTypes = {
    info: React.PropTypes.object.isRequired,
    handleActive: React.PropTypes.func.isRequired
}
