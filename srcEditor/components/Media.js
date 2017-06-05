import React, { PropTypes } from 'react';

const Media = (props) => {
  const entity = props.contentState.getEntity(
          props.block.getEntityAt(0)
  );
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
   media = <Audio src={src} />;
  } else if (type === 'image') {
   media = <Image src={src} />;
  } else if (type === 'video') {
   media = <Video src={src} />;
  }

  return media;
};

export default Media;

const Audio = (props) => (<audio controls src={props.src} style={styles.media} />);
const Image = (props) => (<img src={props.src} style={styles.media} />);
const Video = (props) => (<video controls src={props.src} style={styles.media} />);

//TODO: Esto lo pongo en su sitio, ya si eso mañana
const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
  },
};
