import React, { PropTypes } from 'react';

import SimpleInput from '../form/SimpleInput.js';
import SimpleSelect from '../form/SimpleSelect';

const NewUserForm = ({
    handleNewUser,
    handleNameChange,
    handleLastnameChange,
    handleRoleChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordVisibility,
    roles,
    values
}) => (
  <div className="new-user-container">
    <h2 className="form-title">Create new user: </h2>
    <div className="form-divider"></div>
    <div className="row">
      <SimpleInput inputType={'text'} labeltitle='Name' content={values.name} controller={handleNameChange} />
      <SimpleInput inputType={'text'} labeltitle='Lastname' content={values.lastname} controller={handleLastnameChange} />

    </div>
    <div className="row">
      <SimpleInput inputType={'email'} labeltitle='Email' content={values.email} controller={handleEmailChange} />
      <SimpleInput inputType={'password'} labeltitle='Password' content={values.password} controller={handlePasswordChange} />
    </div>
    <SimpleSelect title='Role:' options={roles} handleChange={handleRoleChange} selected={roles[0]}/>
    <button onClick={handleNewUser}> Create user ! </button>
  </div>
);

NewUserForm.propTypes = {
    handleNewUser: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleLastnameChange: PropTypes.func.isRequired,
    handleRoleChange: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handlePasswordVisibility: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired
};

export default NewUserForm;
