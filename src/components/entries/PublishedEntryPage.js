import React, {PropTypes} from 'react';

import Header from '../layout/Header.js';
import SimpleInput from '../form/SimpleInput.js';
import SimpleToggle from '../form/SimpleToggle.js';
import TagInput from '../form/TagInput.js';
import Alert from '../layout/Alert.js';
import SimpleFile from '../form/SimpleFile.js';

import '../../style/__mainImage.scss';
import '../../style/__mainImage.scss';
import '../../style/__tags.scss';
import '../../style/__entrypage.scss';

const PublishedEntryPage = ({
    previous,
    titleEditable,
    handleChangeTitle,
    data,
    handleEditableChange,
    handleRemoveTag,
    handleAddTag,
    btns,
    toggles,
    errorUpdating,
    errorMessage,
    handleAddMainImg,
    loadingImage
}) => {
    const titleElem = (titleEditable)
        ? (<SimpleInput controller={handleChangeTitle} labeltitle='' content={data.title} inputType="text" design="title-input"/>)
        : (
            <h2>{data.title}</h2>
        );

    const editableIcon = (titleEditable)
        ? 'fa fa-floppy-o'
        : 'fa fa-pencil';

    return (
        <div className="container  edit-entry">
            <Header title="Edit entry" previous={previous}/>
            <div className="container-wHeader entry-container">
                <div className="entry-title row">
                    {titleElem}
                    <div className="btn-edit" onClick={handleEditableChange}>
                        <i className={editableIcon}/>
                    </div>
                </div>
                {errorUpdating && <Alert message={errorMessage} type="error"/>}
                <EntryMainImage handleAddMainImg={handleAddMainImg} imgSrc={data.imgSrc} loadingImage={loadingImage} />
                <PublishedEntryInfo data={data}/>
                <EntryTagList handleRemove={handleRemoveTag} tags={data.tags || []} label="Tags list"/>
                <TagInput title="Add new tag:" handleTagAdded={handleAddTag}/>
                <PublishedToggles toggles={toggles}/>
                <PublishedButtons btns={btns}/>
            </div>
        </div>
    );
};

PublishedEntryPage.propTypes = {
    previous: PropTypes.func,
    titleEditable: PropTypes.bool.isRequired,
    handleChangeTitle: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    handleEditableChange: PropTypes.func.isRequired,
    handleRemoveTag: PropTypes.func.isRequired,
    handleAddTag: PropTypes.func.isRequired,
    btns: PropTypes.array.isRequired,
    toggles: PropTypes.array.isRequired,
    errorUpdating: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    handleAddMainImg: PropTypes.func.isRequired,
    loadingImage: PropTypes.bool.isRequired
};

export default PublishedEntryPage;

const PublishedEntryInfo = ({data}) => (
    <div className="entry-info">
        <EntryItem value={data.date} label="Published:" icon="fa fa-calendar"/>
        <EntryItem value={data.author.name} label="Author:" icon="fa fa-user"/>
        <EntryItem value="1000" label="Views:" icon="fa fa-eye"/>
        <EntryItem value="879" label="Favs:" icon="fa fa-heart"/>
        <EntryItem value="24" label="Comments:" icon="fa fa-commenting-o"/>
        <EntryItem value="211" label="Shared:" icon="fa fa-share-alt-square"/>
    </div>
);

PublishedEntryInfo.propTypes = {
    data: PropTypes.object.isRequired
};

const EntryItem = ({value, icon, label}) => (
    <div className="entry-info--item">
        <span>
            <i className={icon}/> {label}
        </span>
        &nbsp;{value}
    </div>
);

EntryItem.propTypes = {
    value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

const PublishedButtons = ({btns}) => {
  return (
    <div className="entry-btns">
      {btns.map((btn, i) => <ButtonComponent controller={btn.controller} title={btn.title} icon={btn.icon} classBtn={btn.design} key={i}/>)}
    </div>
  );
};

PublishedButtons.propTypes = {
  btns : PropTypes.array.isRequired
};


const ButtonComponent = ({controller, title, icon, classBtn}) => (
  <button className={classBtn} onClick={controller}>
    <i className={icon} />
    {title}
  </button>
);

ButtonComponent.propTypes = {
  controller: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  classBtn: PropTypes.string.isRequired
};

const PublishedToggles = ({toggles}) => (
  <div className="entry-toggles row">
    {toggles.map((tog, i) => <SimpleToggle controller={tog.controller} check={tog.check} key={i}/>)}
  </div>
);

PublishedToggles.propTypes = {
  toggles: PropTypes.array.isRequired
};


const parseTags = (tags) => Array.isArray(tags)?tags:Object.keys(tags);

const EntryTagList = ({handleRemove, tags, label}) => {
    let tagList;
    if(parseTags(tags).length >= 1) tagList = parseTags(tags).map((tag, i) => <EntryTag handleRemove={handleRemove} value={tag} key={i}/>);
    else tagList = (<div className="empty-list"> There are not tags to show. Try adding one. </div>);
    return (
        <div className="tag-container">
            {label}
            <ul className="tag-list">
                {tagList}
            </ul>
        </div>
    );
}

EntryTagList.propTypes = {
    handleRemove: PropTypes.func.isRequired,
    tags: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    label: PropTypes.string
};

const EntryMainImage = ({imgSrc, handleAddMainImg, loadingImage}) => {
  if(loadingImage) return (<LoadingImage />);
  return (<ImageView imgSrc={imgSrc} handleAddMainImg={handleAddMainImg} />);
};

EntryMainImage.propTypes = {
  handleAddMainImg: PropTypes.func.isRequired,
  loadingImage: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired
};

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


const EntryTag = ({value, handleRemove}) => {
  return (
    <li className="tag-list--item">
      <span>{value}</span>
      <i className="fa fa-remove icon-click" onClick={function(){handleRemove(value)}}/>
    </li>
  );
};

EntryTag.propTypes = {
  value: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
};
