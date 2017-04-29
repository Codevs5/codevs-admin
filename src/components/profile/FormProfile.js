import React, {PropTypes} from 'react';

import '../../style/__profile.scss';

import SimpleInput from '../form/SimpleInput.js';
import SimpleTextarea from '../form/SimpleTextarea.js';
import SocialInput from '../form/SocialInput.js';
import Header from '../layout/Header.js';
import ErrorComponent from '../layout/ErrorComponent.js';
import LoadingList from '../layout/LoadingList.js';
import Alert from '../layout/Alert.js';
import Avatar from './Avatar.js';

const FormProfile = ({
    handleFunctions,
    userData,
    socialNetworks,
    error,
    loading,
    updated,
    loadingAvatar
}) => {
    if (error)
        return (<ErrorComponent/>);
    else if (loading)
        return (<LoadingList/>);
    else
        return (<FormProfileView loadingAvatar={loadingAvatar} handleFunctions={handleFunctions} userData={userData} socialNetworks={socialNetworks} updated={updated}/>);
    }
;

FormProfile.propTypes = {
    handleFunctions: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    socialNetworks: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    updated: PropTypes.number.isRequired,
    loadingAvatar: PropTypes.bool.isRequired
};

const FormProfileView = ({handleFunctions, userData, socialNetworks, updated, loadingAvatar}) => {
    let alert;
    if (updated === 1)
        alert = (<Alert message={'Success! Profile was succesfully updated'} type="success"/>);
    else if (updated === -1)
        alert = alert = (<Alert message="Oops, we couldn't update the profile" type="error"/>)
    return (
        <div className="profile-container container">
            <Header title="Profile"/>
            <div className="form-container">
                <h2 className="form-title">Basic information
                </h2>
                <div className="form-divider"></div>
                    {alert}
                <div className="row">
                    <Avatar controller={handleFunctions.handleUserAvatar} upload={true} imgSrc={userData.avatar} loading={loadingAvatar}/>
                </div>
                <div className="row">
                    <SimpleInput inputType={'text'} labeltitle={'Firstname'} content={userData.firstname} controller={handleFunctions.handleFirstNameChange}/>
                    <SimpleInput inputType={'text'} labeltitle={'Lasttname'} content={userData.lastname} controller={handleFunctions.handleLastnameChange}/>
                </div>
                <div className="row">
                    <SimpleInput inputType={'text'} labeltitle={'City'} content={userData.city} controller={handleFunctions.handleCityChange}/>
                    <SimpleInput inputType={'date'} labeltitle={'Birthdate'} content={userData.birthdate} controller={handleFunctions.handleBirthdateChange}/>
                </div>
                <div className="row">
                    <SimpleTextarea labeltitle={'Bio'} resize={false} rows={5} content={userData.bio} controller={handleFunctions.handleBioChange}/>
                </div>
                <h2 className="form-title">Social links
                </h2>
                <div className="form-divider"></div>
                <div className="row social-row">
                    {socialNetworks.map((current, i) => {
                        let content;
                        if (userData.social)
                            content = userData.social[current.name] || '';
                        else
                            content = '';
                        return <SocialInput key={i} icon={current.icon} content={content} controller={handleFunctions.handleSocialChange} name={current.name}/>;
                    })}
                </div>

                <input className="button-submit-profile" type="submit" value="Update profile" onClick={handleFunctions.handleFormSubmit}/>
            </div>
        </div>
    );
}
FormProfileView.propTypes = {
    handleFunctions: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    socialNetworks: PropTypes.array.isRequired,
    updated: PropTypes.number.isRequired,
    loadingAvatar: PropTypes.bool.isRequired

};

export default FormProfile;
