import React, {Component} from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { fetchAllUsers, updateUser, updateUserAvatar } from '../actions/userListActions.js';
import { updateReset } from '../actions/statusActions.js';

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
    }, {
        name: 'youtube',
        icon: 'youtube'
    }, {
        name: 'instagram',
        icon: 'instagram'
    }, {
        name: 'web',
        icon: 'globe'
    }
];

//User default data
const createUserDefaultData = () => {
    return {
            "bio": "",
            "social": {},
            "city": "",
            "firstname": "Anonimo",
            "lastname": "",
            "avatar":  'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
            "birthdate": (new Date()).toISOString().split('T')[0]
        };
}

class FormProfileContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
          currentUser: {}
        }
        //function bindings
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
        this.handleSocialChange = this.handleSocialChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleUserAvatar = this.handleUserAvatar.bind(this);

    }

    componentWillMount() {
      this.props.dispatch(updateReset());
      if(this.props.users.length === 0) this.props.dispatch(fetchAllUsers());
      this.loadUserData(this.props.users || []);
    }

    componentWillReceiveProps(props){

      const listOfUsers = props.users;
      this.loadUserData(listOfUsers || [])
    }

    loadUserData(listOfUsers){
      const id = this.props.match.params.id;
      console.log(this.props.users, id);
      const current = (listOfUsers.filter((user) => user.id === id)[0])?listOfUsers.filter((user) => user.id === id)[0].metadata:{};
      this.setState({
        currentUser : Object.assign({},createUserDefaultData(), current)
      });
    }
    //Handle inputs
    handleFirstNameChange(e) {

        this.setState({currentUser: Object.assign({}, this.state.currentUser, {firstname: e.target.value})});
    }
    handleLastnameChange(e) {
        this.setState({currentUser: Object.assign({}, this.state.currentUser, {lastname: e.target.value})});
    }
    handleBirthdateChange(e) {
        this.setState({currentUser: Object.assign({}, this.state.currentUser, {birthdate: e.target.value})});
    }
    handleCityChange(e) {
        this.setState({currentUser: Object.assign({}, this.state.currentUser, {city: e.target.value})});
    }
    handleBioChange(e) {
        this.setState({currentUser: Object.assign({}, this.state.currentUser, {bio: e.target.value})});
    }
    handleSocialChange(e, newSocial) {
        this.setState({currentUser: Object.assign({}, this.state.currentUser, {social: newSocial})});
    }

    handleUserAvatar(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            const avatarUpload = {
                file: file,
                imagePreviewUrl: reader.result
            };
            this.props.dispatch(updateUserAvatar(id, avatarUpload));
        }

        reader.readAsDataURL(file)

    }


    handleFormSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        this.props.dispatch(updateUser(id, this.state.currentUser));
    }

    render() {

        const controllers = {
            handleLastnameChange: this.handleLastnameChange,
            handleFirstNameChange: this.handleFirstNameChange,
            handleBioChange: this.handleBioChange,
            handleSocialChange: this.handleSocialChange,
            handleFormSubmit: this.handleFormSubmit,
            handleCityChange: this.handleCityChange,
            handleBirthdateChange: this.handleBirthdateChange,
            handleUserAvatar: this.handleUserAvatar
        }

        return (<FormProfile
          userData={this.state.currentUser}
          handleFunctions={controllers}
          socialNetworks={socialNetworks}
          loading={this.props.loading}
          error={this.props.error}
          updated={this.props.updated}
          loadingAvatar={this.props.loadingImage}
          />);
    }
}


const mapStateToProps = (state, action) => ({
  users : state.userList,
  loading: state.status.loading,
  error: state.status.error,
  loadingImage: state.status.loadingImage,
  updated: state.status.updated
});
export default connect(mapStateToProps)(FormProfileContainer);
