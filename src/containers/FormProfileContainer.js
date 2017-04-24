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

export default class FormProfileContainer extends Component {
    constructor(props) {
        super(props);
        const userDefaultData = createUserDefaultData({}).metadata;
        this.state = {
            metadata: {
              bio: userDefaultData.bio,
              social: userDefaultData.social,
              city: userDefaultData.city,
              firstname: userDefaultData.firstname,
              lastname: userDefaultData.lastname,
              avatar: userDefaultData.avatar,
              birthdate: userDefaultData.birthdate,
              social: {},
            },
            loading: true,
            error: false,
            updated: ''
        };

        //function bindings
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
        this.handleSocialChange = this.handleSocialChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.errorOnRetreivingData = this.errorOnRetreivingData.bind(this);
        this.fillUserData = this.fillUserData.bind(this);
    }

    componentDidMount() {
        //const user = firebase.auth().currentUser;
        const id = this.props.match.params.id;

        const dbRef = firebase.database().ref(`/users/${id}`);
        dbRef.on('value', (data) => this.fillUserData(data), (err) => this.errorOnRetreivingData(err));
    }

    fillUserData(data){
      let metadata;
      if (!data.val()) { //No tiene perfil a�n en la DB
          const defaultUserData = createUserDefaultData(user);
          dbRef.set(defaultUserData);
          metadata = defaultUserData.metadata;
      } else {
          metadata = data.val().metadata
      }
      this.setState({
          metadata: {
            bio: metadata.bio,
            city: metadata.city || '',
            firstname: metadata.firstname || '',
            lastname: metadata.lastname || '',
            avatar: metadata.avatar || '',
            birthdate: metadata.birthdate || '',
            social: metadata.social || {},
          },
          error: false,
          loading: false
      });
    }

    errorOnRetreivingData(err){
      this.setState({error: true, loading: false});
    }

    //Handle inputs
    handleFirstNameChange(e) {
      this.setState({metadata: Object.assign({}, this.state.metadata, {firstname: e.target.value})});
    }
    handleLastnameChange(e) {
      this.setState({metadata: Object.assign({}, this.state.metadata, {lastname: e.target.value})});
    }
    handleBirthdateChange(e) {
      this.setState({metadata: Object.assign({}, this.state.metadata, {birthdate: e.target.value})});
    }
    handleCityChange(e) {
      this.setState({metadata: Object.assign({}, this.state.metadata, {city: e.target.value})});
    }
    handleBioChange(e) {
      this.setState({metadata: Object.assign({}, this.state.metadata, {bio: e.target.value})});
    }
    handleSocialChange(e, newSocial) {
      this.setState({metadata: Object.assign({}, this.state.metadata, {social: newSocial})});
    }
    //TODO: Avatar && social

    handleFormSubmit(e) {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const dbRef = firebase.database().ref(`/users/${user.uid}`);

        console.log(this.state);
        dbRef.child('/metadata')
          .update(this.state)
          .then(() => this.setState({updated: 'updated'}))
          .catch(() => this.setState({updated: 'fail'}));

    }

    render() {

        console.log(this.state);
        const controllers = {
          handleLastnameChange : this.handleLastnameChange,
          handleFirstNameChange : this.handleFirstNameChange,
          handleBioChange : this.handleBioChange,
          handleSocialChange : this.handleSocialChange,
          handleFormSubmit : this.handleFormSubmit,
          handleCityChange : this.handleCityChange,
          handleBirthdateChange : this.handleBirthdateChange
        }

        return (<FormProfile
          userData={this.state.metadata}
          handleFunctions={controllers}
          socialNetworks={socialNetworks}
          loading={this.state.loading}
          error={this.state.error}
          updated={this.state.updated}
          />);
    }
}
