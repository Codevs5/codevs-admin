import React, {PropTypes} from 'react';

import '../../style/__profile.scss';

import SimpleInput from '../form/SimpleInput.js';
import SimpleTextarea from '../form/SimpleTextarea.js';
import SocialInput from '../form/SocialInput.js';

const FormProfile = ({handleFunctions, userData, socialNetworks}) => (
    <div className="form-container">
        <h2 className="form-title">Basic information
        </h2>
        <div className="form-divider"></div>
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
                const content = userData.social[current.name] || '';
                return <SocialInput key={i} icon={current.icon} content={content} controller={handleFunctions.handleSocialChange} name={current.name}/>;
            })}
        </div>
        <input className="button-submit-profile" type="submit" value="Update profile" onClick={handleFunctions.handleFormSubmit}/>
    </div>
);

FormProfile.propTypes = {
    handleFunctions: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    socialNetworks: PropTypes.array.isRequired
};

export default FormProfile;
