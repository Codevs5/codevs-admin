import React from 'react';

import '../../style/__loadingItem.scss';

const LoadingEntryItem = () => (
    <div className="loading-entryItem">
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    </div>
);

export default LoadingEntryItem;
