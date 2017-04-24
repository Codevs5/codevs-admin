import React, {PropTypes} from 'react';

import LoadingList from '../layout/LoadingList.js';
import ErrorComponent from '../layout/ErrorComponent.js';
import Header from '../layout/Header.js';
import UserListItem from './UserListItem.js';

import '../../style/__userList.scss';

const UsersList = ({error, loading, users}) => {
    if (error)
        return (<ErrorComponent/>);
    else if (loading)
        return (<LoadingList/>);
    else
        return (<ListOfUsers users={users}/>);
    }

UsersList.propTypes = {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

export default UsersList;

//Aux component
const ListOfUsers = ({users}) => {
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
}

ListOfUsers.propTypes = {
    users : PropTypes.array.isRequired
}
