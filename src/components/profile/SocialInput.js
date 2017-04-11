import React, {PropTypes} from 'react';

const SocialInput = ({icon, content, controller, name}) => {
    const classIcon = `fa fa-${icon}`;
    const classDiv = `social-icon ${name}`;
    return (
        <div className='input-container social-row-box'>
            <div className={classDiv}>
                <i className={classIcon}/>
            </div>
            <input type='text' value={content} onChange={function(e) {
                let newObj = {};
                newObj[name] = e.target.value;
                controller(e, newObj)
            }} className="social-input"/>
        </div>
    );
}

SocialInput.propTypes = {
    icon: PropTypes.string.isRequired,
    controller: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default SocialInput;
