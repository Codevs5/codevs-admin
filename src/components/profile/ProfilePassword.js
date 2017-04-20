import React, {PropTypes} from 'react';

import Header from '../layout/Header.js';
import Alert from '../layout/Alert.js';
import SimpleInput from '../form/SimpleInput.js';

import '../../style/__password.scss';

const ProfilePassword = ({
    visibility,
    handleChangePassword1,
    handleChangePassword2,
    handleUpdatePassword,
    handleChangeVisibility,
    data,
    validPassword,
    updated
}) => {
    const typeInput = (visibility)
        ? 'text'
        : 'password';
    const classVisility = (visibility)
        ? 'fa fa-eye-slash'
        : 'fa fa-eye';
    const visibleLabel = (visibility)
        ? 'Hide the password'
        : 'Set visible';
    const design = (validPassword)
        ? 'valid'
        : 'invalid';
    let alert = '';
    if (updated === 'error')
        alert = (<Alert type='error' message="Error: Can't update the password, you're doing something wrong" icon="fa fa-exclamation-triangle"/>)
    else if (updated === 'updated')
        alert = (<Alert type='success' message="Error: Can't update the password, you're doing something wrong" icon="fa fa-exclamation-triangle"/>)
    return (
        <div className="container">
            <Header title="Update password"/>
            <div className="update-pwd">
                {alert}
                <div className="row">
                    <SimpleInput controller={handleChangePassword1} content={data.password} labeltitle='Insert new password' inputType={typeInput}/>
                    <button onClick={handleChangeVisibility}>
                        <i className={classVisility}/> {visibleLabel}
                    </button>
                </div>
                <SimpleInput controller={handleChangePassword2} content={data.password2} labeltitle='Repeat the password' inputType={typeInput} design={design}/>
                <button onClick={handleUpdatePassword}>
                    Update password
                </button>
            </div>
        </div>
    );
}

ProfilePassword.propTypes = {
    visibility: PropTypes.bool.isRequired,
    handleChangePassword1: PropTypes.func.isRequired,
    handleChangePassword2: PropTypes.func.isRequired,
    handleUpdatePassword: PropTypes.func.isRequired,
    handleChangeVisibility: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    validPassword: PropTypes.bool.isRequired,
    updated: PropTypes.string.isRequired
};

export default ProfilePassword;
