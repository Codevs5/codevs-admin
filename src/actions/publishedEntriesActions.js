import * as firebase from 'firebase';
import * as actions from './statusActions.js';
import * as c from '../constants/publishedTypes.js';
import {ipcRenderer} from 'electron';

export function fetchEntries() {
    return (dispatch) => {
        dispatch(actions.startLoading());
        const dbRef = firebase.database().ref('/entries/info');
        dbRef.orderByChild('date').once('value').then(data => {
            data = data.val();
            let items = [];
            for (let key in data) {
                let copy = Object.assign(data[key], {});
                let author = 'Anónimo';
                if(data[key].author && data[key].author.name) {
                  author = data[key].author.name;
                }
                else if(data[key].author && !typeof data[key].author === 'object') {
                  author = data[key].author;
                }
                delete copy.author;
                items.push({
                    ...copy,
                    author: author,
                    id: key,
                });
            }
            dispatch({type: 'FETCH_P_ENTRIES_FULLFILLED', payload: items});
            dispatch(actions.fetchingSuccess());
        }).catch(err => {
            dispatch(actions.fetchingRejected(err))
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

export function deleteEntry(id, history){
  return (dispatch) => {
    dispatch(actions.startLoading());
    const dbRefInfo = firebase.database().ref(`/entries/info/${id}/`);
    const dbRefContent = firebase.database().ref(`/entries/content/${id}/`);

    dbRefInfo.remove()
    .then(() => dbRefContent.remove())
    .then(() => {dispatch({
      type: c.ENTRY_REMOVE,
      payload: id
    });
    dispatch(actions.removeSuccess());
    //Redirect!!!
    history.goBack();


  }).catch(e => dispatch(actions.updateRejected(e)))
  }
}

export function createEntry(){
  return(dispatch) => {
    dispatch(actions.startLoading());
    const user = firebase.auth().currentUser.uid;

    const dbRefInfo = firebase.database().ref('entries/info');
    firebase.database()
      .ref('users')
      .child(user)
      .once('value')
      .then((snap) => snap.val())
      .then((data) => {
        const entryInfo = {
          author: {
            name: data.metadata.firstname,
            id: user
          },
          pinned: false,
          visible: false,
          date: new Date()
        };
        const key = dbRefInfo.push(entryInfo).key;
        ipcRenderer.send('loadNewWin', {id: key});
        return key;
      })
      .then(() => dispatch(actions.endLoading()));
  }
}
