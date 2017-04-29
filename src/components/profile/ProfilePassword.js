import React, {PropTypes} from 'react';

import Header from '../layout/Header.js';
import Alert from '../layout/Alert.js';
import SimpleInput from '../form/SimpleInput.js';

import '../../style/__password.scss';

const ProfilePassword = ({
    visibilityCurrent,
    visibilityNew,
    visibilityRepeat,
    handleChangePassword1,
    handleChangePassword2,
    handleUpdatePassword,
    handleChangeVisibilityCurrent,
    handleChangeVisibilityNew,
    handleChangeVisibilityRepeat,
    data,
    validPassword,
    updated,
    handleChangeCurrentPassword
}) => {

    const design = (validPassword)
        ? 'valid'
        : 'invalid';
    let alert = '';
    if (updated === 'error')
        alert = (<Alert type='error' message="Error: Can't update the password, you're doing something wrong" icon="fa fa-exclamation-triangle"/>)
    else if (updated === 'updated')
        alert = (<Alert type='success' message="Cool! You updated the password succesfully" icon="fa fa-check"/>)
    return (
        <div className="container">
            <Header title="Update password"/>
            <div className="update-pwd">
                {alert}
                <div className="row">
                    <SimpleInput controller={handleChangeCurrentPassword} content={data.current} labeltitle='Insert current password' inputType={getTypeVisibility(visibilityCurrent)}/>
                    <button className="btn-pwd" onClick={handleChangeVisibilityCurrent}>
                        <i className={getIconVisibility(visibilityCurrent)}/> {getLabelVisibility(visibilityCurrent)}
                    </button>
                </div>
                <div className="row">
                    <SimpleInput controller={handleChangePassword1} content={data.password} labeltitle='Insert new password' inputType={getTypeVisibility(visibilityNew)}/>
                    <button className="btn-pwd" onClick={handleChangeVisibilityNew}>
                        <i className={getIconVisibility(visibilityNew)}/> {getLabelVisibility(visibilityNew)}
                    </button>
                </div>
                <div className="row">
                    <SimpleInput controller={handleChangePassword2} content={data.password2} labeltitle='Repeat the password' inputType={getTypeVisibility(visibilityRepeat)} design={design}/>
                    <button className="btn-pwd" onClick={handleChangeVisibilityRepeat}>
                        <i className={getIconVisibility(visibilityRepeat)}/> {getLabelVisibility(visibilityRepeat)}
                    </button>
                </div>
                <button className="btn-pwd btn-pwd--update" onClick={handleUpdatePassword}>
                    Update password
                </button>
                <p className="required-warning"> * Password must contain at least 6 characters * </p>
            </div>
        </div>
    );
}

ProfilePassword.propTypes = {
    visibilityCurrent: PropTypes.bool.isRequired,
    visibilityNew: PropTypes.bool.isRequired,
    visibilityRepeat: PropTypes.bool.isRequired,
    handleChangePassword1: PropTypes.func.isRequired,
    handleChangePassword2: PropTypes.func.isRequired,
    handleUpdatePassword: PropTypes.func.isRequired,
    handleChangeVisibilityCurrent: PropTypes.func.isRequired,
    handleChangeVisibilityNew: PropTypes.func.isRequired,
    handleChangeVisibilityRepeat: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    validPassword: PropTypes.bool.isRequired,
    updated: PropTypes.string.isRequired,
    handleChangeCurrentPassword: PropTypes.func.isRequired
}

export default ProfilePassword;

//
const getIconVisibility = (visible) => (visible)
    ? 'fa fa-eye-slash'
    : 'fa fa-eye';

const getLabelVisibility = (visible) => (visible)
    ? 'Hide the password'
    : 'Set visible';

const getTypeVisibility = (visible) => (visible)
    ? 'text'
    : 'password';
