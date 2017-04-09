import React from 'react';
import { Link } from 'react-router-dom';

//Custom components
import { MenuItem } from './MenuItem.js';

const menuItemsData = [
  {
    path: '/',
    name: 'Home',
    iconName: 'home'
  },
  {
    path: '/profile',
    name: 'Profile',
    iconName: 'profile'
  },
  {
    path: '/users',
    name: 'User',
    iconName: 'user'
  }
]
export const Menu = ({handleLogout}) => {
  const menuItems = menuItemsData.map((data, i) => <MenuItem info={data} key={i} />);
  return (
  <header className="menu">
    <img src="./images/logo.png" height="64px" width="64px" />
    <nav className="menu-nav">
      {menuItems}
    </nav>
    <button className="button button-primary" onClick={handleLogout}> LogoOut </button>
  </header>
)}
