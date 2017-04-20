import React, {PropTypes} from 'react';

import MenuCardItem from './MenuCardItem.js';

import '../../style/__menucards.scss';

const MenuCard = ({title, cards}) => (
    <div className="container">
        <div className="menu-card">
            <h3 className="menu-card--title">
                {title}
            </h3>
            <div className="menu-card-list">
                {cards.map((card, i) => (<MenuCardItem card={card} key={i}/>))}
            </div>
        </div>
    </div>
);

MenuCard.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
};

export default MenuCard;
