import React, { PropTypes } from 'react';
import MenuItem from './MenuItem.js';

import '../../style/__menu.scss';

const Menu = ({menuItems, handleLogout, handleActive}) => (
  <div className="menu">
    <div className="menu-top">
      <div className="menu-logo">
        <img src="./images/logo.png" height="64px" width="56px" />
      </div>
      <nav className="menu-nav">
          {menuItems.map((data, i) => <MenuItem info={data} handleActive={handleActive} key={i}/>)}
      </nav>
    </div>
      <button className="button-logout" onClick={handleLogout}>
          Log Out
      </button>
  </div>
);

Menu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
  handleActive: PropTypes.func.isRequired
};

export default Menu;
