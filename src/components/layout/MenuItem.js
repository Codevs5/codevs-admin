import React from 'react';
import { Link } from 'react-router-dom';


export const MenuItem = ({info}) => {
  const classIcon = `fa fa-${info.iconName}`;
  return (
    <Link to={info.path}>
      <i className={classIcon} />
      <p> {info.name} </p>
    </Link>
  )
}
