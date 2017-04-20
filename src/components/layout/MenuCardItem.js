import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const MenuCardItem = ({ card }) => {
  const imageSrc = `./images/cards/${card.imagePath}`;
  return (
    <Link to={card.linkPath} className="menu-card-item">
      <div className="menu-card-item-container">
        <img src={imageSrc} alt={card.title} height="120px" width="160px"/>
        <h4>{card.title}</h4>
      </div>
    </Link>
  );
};

MenuCardItem.propTypes = {
  card: PropTypes.object.isRequired
}

export default MenuCardItem;
