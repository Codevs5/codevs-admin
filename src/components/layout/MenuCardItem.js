import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const MenuCardItem = ({ card }) => {
  const imageSrc = `./images/cards/${card.imagePath}`;
  const innerComp = (<div className="menu-card-item-container">
    <img src={imageSrc} alt={card.title} height="120px" width="160px"/>
    <h4>{card.title}</h4>
  </div>);

  if(card.controller){
    return(
      <div onClick={card.controller} className="menu-card-item">
        {innerComp}
      </div>
    );
  }
  return (
    <Link to={card.linkPath} className="menu-card-item">
      {innerComp}
    </Link>
  );
};

MenuCardItem.propTypes = {
  card: PropTypes.object.isRequired
}

export default MenuCardItem;
