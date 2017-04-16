import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const Entries = () => (
  <div className="container">
    <Link to="/entries/published" >
      Published entries
    </Link>
    <Link to="/entries/validator">
      Validate Entries
    </Link>
  </div>
);

export default Entries;
