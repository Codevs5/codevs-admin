import React, {PropTypes} from 'react';

import Header from '../layout/Header.js';
import UserListItem from './UserListItem.js';

import '../../style/__userList.scss';

const UsersList = ({error, loading, users}) => {
  //TODO: Componente lista vacia!
  const list = (users.length === 0)?
    (<h1> Lista vacia </h1>):
    (users.map((user, i) => (<UserListItem user={user.metadata} id={user.id} key={i} />)));
  return (
    <div className="container">
      <Header title="List of users"/>
      <div className="container-wHeader user-list">
        {list}
      </div>
    </div>
  )
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersList;
