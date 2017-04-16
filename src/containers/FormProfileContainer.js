import React, {Component} from 'react';
import * as firebase from 'firebase';

import FormProfile from '../components/profile/FormProfile.js';

const socialNetworks = [
    {
        name: 'twitter',
        icon: 'twitter'
    }, {
        name: 'facebook',
        icon: 'facebook'
    }, {
        name: 'linkedin',
        icon: 'linkedin'
    }, {
        name: 'github',
        icon: 'github'
    }, {
        name: 'googleplus',
        icon: 'google-plus'
    },
    {
        name: 'youtube',
        icon: 'youtube'
    },{
        name: 'instagram',
        icon: 'instagram'
    }, {
        name: 'web',
        icon: 'globe'
    }
];

//User default data
const createUserDefaultData = (user) => {
    return {
        metadata: {
            "bio": "Soy un soso y no tengo una bio",
            "social": {},
            "city": "Codevs city",
            "firstname": user.displayName || "Anonimo",
            "lastname": "",
            "avatar": user.photoURL || '',
            "birthdate": (new Date()).toISOString().split('T')[0]
        },
        "stats": {
            "joined": (new Date()).toISOString().split('T')[0],
            "lastmod": (new Date()).toISOString().split('T')[0],
            "role": 10
        }
    }
}

export default class FormContainer extends Component {
    constructor(props) {
        super(props);
        const userDefaultData = createUserDefaultData({}).metadata;
        this.state = {
            bio: userDefaultData.bio,
            social: userDefaultData.social,
            city: userDefaultData.city,
            firstname: userDefaultData.firstname,
            lastname: userDefaultData.lastname,
            avatar: userDefaultData.avatar,
            birthdate: userDefaultData.birthdate
        };

        //function bindings
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
        this.handleSocialChange = this.handleSocialChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        const dbRef = firebase.database().ref(`/users/${user.uid}`);
        dbRef.on('value', (data) => {
            let metadata;
            if (!data.val()) { //No tiene perfil a�n en la DB
                const defaultUserData = createUserDefaultData(user);
                dbRef.set(defaultUserData);
                metadata = defaultUserData.metadata;
            } else {
                metadata = data.val().metadata
            }
            this.setState({
                bio: metadata.bio,
                city: metadata.city,
                firstname: metadata.firstname,
                lastname: metadata.lastname,
                avatar: metadata.avatar,
                birthdate: metadata.birthdate,
                social: metadata.social
            });
        })
    }

    //Handle inputs
    handleFirstNameChange(e) {
        this.setState({firstname: e.target.value});
    }
    handleLastnameChange(e) {
        this.setState({lastname: e.target.value});
    }
    handleBirthdateChange(e) {
        this.setState({birthdate: e.target.value});
    }
    handleCityChange(e) {
        this.setState({city: e.target.value});
    }
    handleBioChange(e) {
        this.setState({bio: e.target.value});
    }
    handleSocialChange(e, newSocial) {
        this.setState({social: Object.assign({}, this.state.social, newSocial)})
    }
    //TODO: Avatar && social

    handleFormSubmit(e) {
        e.preventDefault();
        const payload = {
            metadata: this.state,
            stats: {
                'lastmod': (new Date()).toISOString().split('T')[0]
            }
        }
        const user = firebase.auth().currentUser;
        const dbRef = firebase.database().ref(`/users/${user.uid}`);
        dbRef.child('/metadata').update(payload.metadata);
        dbRef.child('/stats').update(payload.stats);
    }

    render() {


        const controllers = {
          handleLastnameChange : this.handleLastnameChange,
          handleFirstNameChange : this.handleFirstNameChange,
          handleBioChange : this.handleBioChange,
          handleSocialChange : this.handleSocialChange,
          handleFormSubmit : this.handleFormSubmit,
          handleCityChange : this.handleCityChange,
          handleBirthdateChange : this.handleBirthdateChange
        }
        return (<FormProfile userData={this.state} handleFunctions={controllers}  socialNetworks={socialNetworks}/>);
    }
}