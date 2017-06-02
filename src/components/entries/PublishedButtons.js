import React, { PropTypes } from 'react';

const PublishedButtons = ({btns}) => {

  return (
    <div className="entry-btns">
      {btns.map((btn, i) => <ButtonComponent controller={btn.controller} title={btn.title} icon={btn.icon} classBtn={btn.design} key={i}/>)}
    </div>
  );
};

PublishedButtons.propTypes = {
  btns : PropTypes.array.isRequired
};

export default PublishedButtons;

const ButtonComponent = ({controller, title, icon, classBtn}) => (
  <button className={classBtn} onClick={controller}>
    <i className={icon} />
    {title}
  </button>
);

ButtonComponent.propTypes = {
  controller: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  classBtn: PropTypes.string.isRequired
}
