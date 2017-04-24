import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const UserListItem = ({ user, id }) => {
  return (
    <div className="user-list-item">
      {user.firstname}
      <Link className="btn-profile" to={`/profile/basic/${id}`}>
        View profile
      </Link>
    </div>
  );
};

UserListItem.propTypes = {
  user : PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default UserListItem;
