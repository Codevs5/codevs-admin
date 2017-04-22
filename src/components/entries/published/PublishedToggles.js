import React, { PropTypes } from 'react';

import SimpleToggle from '../../form/SimpleToggle.js';

const PublishedToggles = ({toggles}) => (
  <div className="entry-toggles row">
    {toggles.map((tog, i) => <SimpleToggle controller={tog.controller} check={tog.check} key={i}/>)}
  </div>
);

PublishedToggles.propTypes = {
  toggles: PropTypes.array.isRequired
};

export default PublishedToggles;
