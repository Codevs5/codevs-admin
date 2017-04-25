import React, { PropTypes } from 'react';

import SimpleFile from '../../form/SimpleFile.js';

import '../../../style/__mainImage.scss';
import '../../../style/__mainImage.scss';

const EntryMainImage = ({imgSrc, handleAddMainImg, loadingImage}) => {
  if(loadingImage) return (<LoadingImage />);
  return (<ImageView imgSrc={imgSrc} handleAddMainImg={handleAddMainImg} />);
};

EntryMainImage.propTypes = {
  handleAddMainImg: PropTypes.func.isRequired,
  loadingImage: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired
};

export default EntryMainImage;

const ImageView = ({imgSrc, handleAddMainImg}) => {
  return (
    <div className="entry-mainImg">
      <img src={imgSrc} height="300px" width="500px" />
      <SimpleFile controller={handleAddMainImg} label={'Upload new image'} icon={'fa fa-upload'} />
    </div>
  );
};

ImageView.propTypes = {
  handleAddMainImg: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired
};

const LoadingImage = () => (
  <div className="loadingImage">
    <section className="mod model-1">
        <div className="spinner"></div>
    </section>
  </div>
);
