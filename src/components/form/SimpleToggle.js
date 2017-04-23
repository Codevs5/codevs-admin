import React, {PropTypes} from 'react';
import '../../style/__toggle.scss';

const SimpleToggle = ({check, controller}) => {
    const checkedIcon = `fa fa-${check.iconCheck} checked`;
    const uncheckedIcon = `fa fa-${check.iconUncheck} unchecked`;

    return (
      <div className="toggle-box">
        <span>{check.uncheckMssg}</span>
        <label htmlFor={check.checkMssg} className="switch" >
            <input id={check.checkMssg} type="checkbox" onChange={controller} checked={check.isCheck}/>
            <div className="slider"></div>
              <i className={checkedIcon} />
            <i className={uncheckedIcon} />
        </label>
          <span>{check.checkMssg}</span>
      </div>
    );
};

SimpleToggle.propTypes = {
    controller: PropTypes.func.isRequired,
    check: PropTypes.object.isRequired
};

export default SimpleToggle;
