import React, {PropTypes} from 'react';

import '../../style/__header.scss';

const Header = ({title, previous}) => {
    if (previous) {
      return (
        <header className="header">
          <button onClick={previous} className="btn-back"> <i className="fa fa-chevron-left"/> </button>
            {title}
        </header>
      );
    } else {
        return (
            <header className="header">
                {title}
            </header>
        );
    }

}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;
