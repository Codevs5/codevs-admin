import React, {PropTypes} from 'react';

import Header from '../layout/Header.js';
import NewUserForm from './NewUserForm.js';
import LoadingList from '../layout/LoadingList.js';
import ErrorComponent from '../layout/ErrorComponent.js';

import '../../style/__newUser.scss';
import '../../style/__profile.scss';

const NewUser = ({
    handleNewUser,
    handleNameChange,
    handleLastnameChange,
    handleRoleChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordVisibility,
    roles,
    values,
    currentRole,
    loading,
    error,
    updated

}) => {
    if (error)
        return (<ErrorComponent/>);
    else if (loading)
        return (<LoadingList/>);
    else
        return (
            <div className="container">
                <Header title="Add new user"/>
                <NewUserForm updated={updated} currentRole={currentRole} handleNewUser={handleNewUser} handleNameChange={handleNameChange} handleLastnameChange={handleLastnameChange} handleRoleChange={handleRoleChange} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} handlePasswordVisibility={handlePasswordVisibility} roles={roles} values={values}/>
            </div>
        );
    }
NewUser.propTypes = {
    handleNewUser: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleLastnameChange: PropTypes.func.isRequired,
    handleRoleChange: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handlePasswordVisibility: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    currentRole: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    updated: PropTypes.string.isRequired,
};

export default NewUser;
