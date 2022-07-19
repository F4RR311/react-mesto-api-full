import React from "react";
import { Link } from "react-router-dom";

function BurgerMenu(props) {
  return (
    <div
      className={`header__info-mobile  ${
        props.isBurgerOpen ? "header__info-mobile_opened" : ""
      }`}
    >
      <p className="header__email-mobile">{props.email}</p>
      <Link to="/signin" onClick={props.onExit} className="header__link-mobile">
        Выйти
      </Link>
    </div>
  );
}

export default BurgerMenu;
