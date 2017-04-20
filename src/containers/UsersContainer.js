import React, {Component} from 'react';

import MenuCard from '../components/layout/MenuCard.js';

export default class UsersContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const users = [
            {
                linkPath: '/users/add',
                title: 'Create new user',
                imagePath: 'createNewUser.png'
            }, {
                linkPath: '/users/list',
                title: 'View user list',
                imagePath: 'userList.png'
            }, {
              linkPath: '/users/stats',
              title: 'View user stats',
              imagePath: 'userStats.png'
            }
        ];
        return (<MenuCard title="Users" cards={users} />);
    }
}
