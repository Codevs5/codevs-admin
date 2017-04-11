import React, { PropTypes } from 'react';
import '../../style/__header.scss';

export const Header = ({title}) => (
  <header className="header">
    {title}
  </header>
)

Header.propTypes = {
  title : PropTypes.string.isRequired
}
