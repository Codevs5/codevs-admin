import React, { PropTypes } from 'react';

import styles from '../styles/EditorStyleMap';

const Tag = (props) => {
  return <span {...props} style={styles.tag}>{props.children}</span>;
}

export default Tag;
