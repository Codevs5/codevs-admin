import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../style/__menu.scss';

//Custom components
import {MenuItem} from './MenuItem.js';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItemsData: [
                {
                    path: '/',
                    name: 'Home',
                    iconName: 'home',
                    isActive: true
                }, {
                    path: '/profile',
                    name: 'Profile',
                    iconName: 'user-md',
                    isActive: false
                }, {
                    path: '/users',
                    name: 'Users',
                    iconName: 'users',
                    isActive: false
                },
                {
                    path: '/users',
                    name: 'New Post',
                    iconName: 'file-text',
                    isActive: false
                }
            ]
        };
        this.handleActive = this.handleActive.bind(this);
    }

    handleActive(e, path) {
        let newMenuItemsData = [];
        for (let i = 0; i < this.state.menuItemsData.length; i++) {
            newMenuItemsData.push(Object.assign({}, this.state.menuItemsData[i], {
                isActive: (path === this.state.menuItemsData[i].path)
            }));
        }
        this.setState({menuItemsData: newMenuItemsData})
    }

    render() {
        const menuItems = this.state.menuItemsData.map((data, i) => <MenuItem info={data} handleActive={this.handleActive} key={i}/>);
        return (
            <header className="menu">
              <div className="menu-top">
                <div className="menu-logo">
                  <img src="./images/logo.png" height="64px" width="56px" />
                </div>
                <nav className="menu-nav">
                    {menuItems}
                </nav>
              </div>
                <button className="button-logout" onClick={this.props.handleLogout}>
                    LogoOut
                </button>
            </header>
        );
    }
}

Menu.propTypes = {
    handleLogout: React.PropTypes.func.isRequired
}
