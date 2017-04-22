import React, {PropTypes} from 'react';

import PublishedEntryPage from './PublishedEntryPage.js';
import ErrorComponent from '../../layout/ErrorComponent.js';
import LoadingList from '../../layout/LoadingList.js';

const PublishedEntry = ({
    previous,
    loading,
    error,
    titleEditable,
    handleChangeTitle,
    handleEditableChange,
    data,
    handleAddTag,
    handleRemoveTag,
    btns,
    toggles,
    errorMessage,
    errorUpdating
}) => {
    if (error) {
        return (<ErrorComponent/>);
    } else if (loading) {
        return (<LoadingList/>);
    } else {
        return (<PublishedEntryPage
          previous={previous}
          titleEditable={titleEditable}
          handleChangeTitle={handleChangeTitle}
          handleEditableChange={handleEditableChange}
          data={data}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          btns={btns}
          toggles={toggles}
          errorUpdating={errorUpdating}
          errorMessage={errorMessage}
          />);
    }
};

PublishedEntry.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    previous: PropTypes.func,
    titleEditable: PropTypes.bool.isRequired,
    handleChangeTitle: PropTypes.func.isRequired,
    handleEditableChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    handleRemoveTag: PropTypes.func.isRequired,
    handleAddTag: PropTypes.func.isRequired,
    btns: PropTypes.array.isRequired,
    toggles: PropTypes.array.isRequired,
    errorUpdating: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
};

export default PublishedEntry;
