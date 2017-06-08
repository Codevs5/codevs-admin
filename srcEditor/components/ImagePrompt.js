import React, { PropTypes } from 'react';

const ImagePrompt = ({data}) => (
  <div className="prompt">
    <input
      onChange={data.onURLChange}
      type="text"
      value={data.urlValue}
      onKeyDown={data.onURLInputKeyDown}
    />
    <button onClick={data.confirmMedia}>
      Confirm
    </button>
  </div>
);

ImagePrompt.propTypes = {
  data : PropTypes.object.isRequired
};

export default ImagePrompt;
