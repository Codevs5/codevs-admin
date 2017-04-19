import React from 'react';
import { Link } from 'react-router-dom';

const Users = () => (

  <div className="container">
    <Link to="/users/add">
      Add new user
    </Link>
    <Link to="/users/list">
      View user list
    </Link>
  </div>
);

export default Users;
