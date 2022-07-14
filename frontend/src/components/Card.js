import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = (props) => {

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteCard(){
        props.onCardDelete(props.card)
    }

    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button' : 'element__delete-button_hidden'}`
    );

    const cardLikeButtonClassName = (
        `element__button-heart ${isLiked ? 'element__button-heart_liked' : ''}`
    );

    return (
        <article className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteCard} type="button"> </button>
            <img className="element__image" alt={props.name} src={props.link} title="Посмотреть в полном размере"
                 onClick={handleClick}/>
            <h2 className="element__title">{props.name} </h2>
            <div className="element__like-container">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"
                        aria-label="Нравится"> </button>
                <span className="element__button-heart-count">{props.likes} </span>
            </div>
        </article>
    )

}
export default Card;