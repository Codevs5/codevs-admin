import * as firebase from 'firebase';
import {
    startLoading,
    fetchingSuccess,
    fetchingRejected,
    updateRejected,
    updateSuccess,
    uploadImage,
    uploadImageRejected,
    uploadImageSuccess
} from './statusActions';
import * as c from '../constants/userListTypes';
import {secondaryAuth} from '../index.js';
import {validateUser} from '../utils/validateUserProfile.js';
import uuid from 'node-uuid';

export function fetchAllUsers() {
    return (dispatch) => {
        dispatch(startLoading());
        const dbRef = firebase.database().ref('/users/');

        dbRef.once('value').then(res => res.val()).then(data => {
            let users = Object.keys(data).map((key) => {
                data[key].id = key;
                return data[key];
            });

            users.sort((a, b) => {
                if (a.metadata.firstname.toLowerCase() > b.metadata.firstname.toLowerCase()) {
                    return 1;
                }
                if (a.metadata.firstname.toLowerCase() < b.metadata.firstname.toLowerCase()) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            dispatch({type: c.FETCH_USERS_SUCCESS, payload: users});
            dispatch(fetchingSuccess());
        }).catch(err => {
            dispatch(fetchingRejected(err));
        })
    };
}

export function updateUser(id, currentUser) {
    return (dispatch) => {
        dispatch(startLoading());
        const dbRef = firebase.database().ref(`/users/${id}`);
        dbRef.child('/metadata').update(currentUser).then(() => {
            console.log(currentUser);
            dispatch(updateSuccess());
            dispatch({
                type: c.UPDATE_USER_SUCCESS,
                payload: {
                    id,
                    currentUser
                }
            })
        }).catch((e) => dispatch(updateRejected(e)));
    }
}

export function updateUserAvatar(id, avatarUpload) {
    return (dispatch) => {
        dispatch(uploadImage());
        const stRef = firebase.storage().ref(`users/${id}`);
        const metadata = {
            contentType: 'image/png'
        };
        const uploadTask = stRef.child('avatar.png').put(avatarUpload.file, metadata);
        uploadTask.then(() => uploadFinished(dispatch, id)).catch((err) => dispatch(uploadImageRejected(err)));
    }
}

const uploadFinished = (dispatch, id) => {
    const dbRef = firebase.database().ref(`/users/${id}/metadata`);
    const stRef = firebase.storage().ref(`/users/${id}/avatar.png`);
    stRef.getDownloadURL().then((url) => dbRef.update({avatar: url}).then(() => url)).then((url) => {
        dispatch({
            type: c.UPLOAD_USER_AVATAR_SUCCESS,
            payload: {
                id,
                url
            }
        });
        dispatch(uploadImageSuccess())
    }).catch((e) => {
        dispatch(uploadImageRejected(e));

    });
}

export function addNewUser(data) {
    return (dispatch) => {
        if (validateUser(data))
            createNewUser(data, dispatch);
        else
            dispatch(updateRejected());
        }
    }

const createNewUser = (data, dispatch) => {

    dispatch(startLoading());
    secondaryAuth.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(user => createUserProfile(user, data, dispatch))
    .then(() => {
        dispatch(updateSuccess());
        dispatch({
            type: c.CREATE_USER,
            payload: {
                metadata: {
                    firstname: data.name,
                    lastname: data.lastname,
                    isAdmin: (data.role === 'admin'),
                    avatar: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
                },
                id: user.uid
            }
        });
    }).catch(err => updateRejected(err));
};

const createUserProfile = (user, data, dispatch) => {

    const dbRef = firebase.database().ref('users');
    const newUser = {};
    newUser[user.uid] = {
        metadata: {
            firstname: data.name,
            lastname: data.lastname,
            isAdmin: (data.role === 'admin'),
            avatar: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
        }
    };

    return dbRef.update(newUser).then(res => setUserRole(user, data))

};

const setUserRole = (user, data) => {
    const dbRef = firebase.database().ref('admins');
    const newUser = {};

    newUser[user.uid] = {
        googleName: data.name,
        key: uuid.v4()
    };
    console.log('c');
    if (data.role !== 'admin') {
        return Promise.resolve();
    } else {
        return dbRef.update(newUser);

    }
}
