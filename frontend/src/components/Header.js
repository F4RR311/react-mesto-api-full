import React from "react";
import logo from "../images/mesto-logo.svg";
import {Link} from "react-router-dom";

const Header = (props) => {
    return (

        <div className="header">
            <img className="header__logo" src={logo}
                 alt="Логотип Mesto"/>
                 <nav className="header__auth">
                     <p className="header__text">{props.mail}</p>
    <Link to={props.route} className="header__link" type="button" onClick={props.onClick}> {props.title} </Link>
                 </nav>

        </div>

    )


}
export default Header;