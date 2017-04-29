import * as firebase from 'firebase';
import * as actions from './statusActions.js';

export function fetchEntries() {
    return (dispatch) => {
        dispatch(actions.startLoading());
        const dbRef = firebase.database().ref('/entries/info');
        dbRef.orderByChild('date').once('value').then(data => {
            data = data.val();
            let items = []
            for (let key in data) {
                items.push({
                    ...data[key],
                    id: key
                });
            }

            dispatch({type: 'FETCH_P_ENTRIES_FULLFILLED', payload: items});
            dispatch(actions.fetchingSuccess());
        }).catch(err => {
            dispatch(actions.fetchEntriesRejected(err))
        });
    }
};

export function updateEntry(id, data) {
    return (dispatch) => {
        const dbRef = firebase.database().ref(`/entries/info/${id}`);
        dbRef.update(data).then(() => {
            dispatch({
                type: 'UPDATE_ENTRY',
                payload: {
                    id,
                    data
                }
            });
            dispatch(actions.updateSuccess())
        }).catch((err) => dispatch(actions.updateRejected(err)));
    };
}

export function uploadImage(id, file) {
    return (dispatch) => {
        dispatch(actions.uploadImage());
        let reader = new FileReader();

        reader.onloadend = () => {
            const mainImgUpload = {
                file: file,
                imagePreviewUrl: reader.result
            };
            startUpload(dispatch, mainImgUpload, id);
        };
        reader.readAsDataURL(file);
    };
}

const startUpload = (dispatch, mainImgUpload, id) => {
    const stRef = firebase.storage().ref(`entries/${id}`);

    const metadata = {
        contentType: 'image/png'
    };
    const uploadTask = stRef.child('main.png').put(mainImgUpload.file, metadata);
    uploadTask.then(() => uploadFinished(id, dispatch)).catch((err) => dispatch(actions.uploadImageRejected(err)));
};

const uploadFinished = (id, dispatch) => {
    const dbRef = firebase.database().ref(`/entries/info/${id}/`);
    const stRef = firebase.storage().ref(`/entries/${id}/main.png`);
    stRef.getDownloadURL().then((url) => dbRef.update({imgSrc: url}).then(() => url)).then((url) => {
        dispatch({
            type: 'UPLOAD_IMAGE_FULLFILLED',
            payload: {
                data: {
                    imageURL: url
                }
            }
        });
        dispatch(actions.uploadImageSuccess());
    }).catch((err) => dispatch(actions.uploadImageRejected(err)));
};
