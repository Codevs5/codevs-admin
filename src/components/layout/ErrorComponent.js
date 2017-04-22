import React, {PropTypes} from 'react';
import '../../style/__error.scss';

const ErrorComponent = ({message}) => (
    <div className="error container">
        <p className="error-title">{message || "You screwed up, it's you're problem dude"}</p>
        <div className="machine">
            <div className="machine-top">
                <div className="machine-middle"></div>
            </div>
            <div className="machine-bottom"></div>
            <div className="hand"></div>
            <div className="left-hand"></div>
            <div className="coffee"></div>
        </div>
    </div>
);

ErrorComponent.propTypes = {
    message: PropTypes.string
};

export default ErrorComponent;
