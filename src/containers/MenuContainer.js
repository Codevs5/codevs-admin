import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//Custom components
import Menu from '../components/layout/Menu.js';

export default class MenuContainer extends Component {
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
                }, {
                    path: '/entries',
                    name: 'Entries',
                    iconName: 'file-text',
                    isActive: false
                }, {
                    path: '/stats',
                    name: 'Stats',
                    iconName: 'line-chart',
                    isActive: false
                },{
                    path: '/calendar',
                    name: 'Calendar',
                    iconName: 'calendar',
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
        return (<Menu handleLogout={this.props.handleLogout} menuItems={this.state.menuItemsData} handleActive={this.handleActive}/>);
    }
}

Menu.propTypes = {
    handleLogout: React.PropTypes.func.isRequired
}
