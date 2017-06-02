import React, {PropTypes} from 'react';

import Header from '../layout/Header.js';
import SimpleInput from '../form/SimpleInput.js';
import PublishedEntryInfo from './PublishedEntryInfo.js';
import EntryTagList from './EntryTagList.js';
import PublishedButtons from './PublishedButtons.js';
import PublishedToggles from './PublishedToggles.js';
import TagInput from '../form/TagInput.js';
import Alert from '../layout/Alert.js';
import EntryMainImage from './EntryMainImage.js';

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
