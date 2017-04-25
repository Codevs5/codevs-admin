import React, {PropTypes} from 'react';

import SimpleFile from '../form/SimpleFile.js';
import '../../style/__avatar.scss';

const Avatar = ({upload, controller, imgSrc, loading}) => {
    if (loading)
        return (<LoadingAvatar/>);
    else
        return (
            <div className="avatar-container">
                <img src={imgSrc} alt="Avatar" height="135px" width="135px"/> {upload && <SimpleFile label="Upload avatar" controller={controller} icon="fa fa-upload"/>}
            </div>
        )
};

Avatar.propTypes = {
    upload: PropTypes.bool.isRequired,
    imgSrc: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    controller: PropTypes.func
};

export default Avatar;

const LoadingAvatar = () => (
    <div className="loading-avatar avatar-container">
        <section className="mod model-1">
            <div className="spinner"></div>
        </section>
    </div>
);
