import React, {PropTypes} from 'react';

import SimpleInput from '../form/SimpleInput.js';
import SimpleSelect from '../form/SimpleSelect';
import Alert from '../layout/Alert.js';

const NewUserForm = ({
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
    updated
}) => {
    let updateAlert;
    if (updated === 1)
        updateAlert = (<Alert icon="fa fa-check-square-o" type='success' message='Yeeah, you just created a new user!'/>);
    else if (updated === -1)
        updateAlert = (<Alert icon="fa fa-exclamation" type='error' message="Booo! You're doing something wrong. Check the fields"/>);
    else
        updateAlert = (<div className="ghost-space" />)

    return (
        <div className="new-user-container">
            <h2 className="form-title">Create new user:
            </h2>

            <div className="form-divider"></div>
            {updateAlert}
            <div className="row">
                <SimpleInput inputType={'text'} labeltitle='Name' content={values.name} controller={handleNameChange}/>
                <SimpleInput inputType={'text'} labeltitle='Lastname' content={values.lastname} controller={handleLastnameChange}/>

            </div>
            <div className="row">
                <SimpleInput inputType={'email'} labeltitle='Email' content={values.email} controller={handleEmailChange}/>
                <SimpleInput inputType={'password'} labeltitle='Password' content={values.password} controller={handlePasswordChange}/>
            </div>
            <div className="row create-row">
                <SimpleSelect title='Role:' options={roles} handleChange={handleRoleChange} selected={currentRole}/>
                <button className="btn-createUser" onClick={handleNewUser}>
                    Create user !
                </button>
            </div>
            <p className="required-warning"> * Password must contain at least 6 characters * </p>
        </div>
    );
}
NewUserForm.propTypes = {
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
    updated: PropTypes.number.isRequired

};

export default NewUserForm;
