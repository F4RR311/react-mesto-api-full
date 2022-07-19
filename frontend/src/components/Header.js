import logo from "../images/header/header-logo.svg";
import { Link, useLocation } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import Burger from "../images/header/burger.svg";
import Close from "../images/header/burger-close.svg";

function Header(props) {
  const location = useLocation();
  return (
    <header className="header page__header">
      <BurgerMenu
        email={props.email}
        isBurgerOpen={props.isBurgerOpen}
        onExit={props.handleSignOut}
      />
      <div className="header__container">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип Mesto, подпись Россия."
        />
        <div className="header__info">
          {props.loggedIn ? (
            <>
              <p className="header__email">{props.email}</p>
              <img
                className="header__burger"
                alt="Бургер меню."
                src={props.isBurgerOpen ? Close : Burger}
                onClick={props.burgerOpen}
              ></img>
              <Link
                to="/signin"
                onClick={props.handleSignOut}
                className="header__link"
              >
                Выйти
              </Link>
            </>
          ) : (
            <Link
              className={`header__link ${
                props.isBurgerOpen ? "" : "header__link_opened"
              }`}
              to={`${location.pathname === "/signin" ? "/signup" : "/signin"}`}
            >
              {`${location.pathname === "/signin" ? "Регистрация" : "Войти"}`}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
