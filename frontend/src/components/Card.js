import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardDelete, onCardLike}) => {

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteCard(){
        onCardDelete(card)
    }

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;

    const isLiked = card.likes.some((i) => i === currentUser._id);

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button' : 'element__delete-button_hidden'}`
    );

    const cardLikeButtonClassName = (
        `element__button-heart ${isLiked ? 'element__button-heart_liked' : ''}`
    );

    return (
        <article className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteCard} type="button"> </button>
            <img className="element__image" alt={card.name} src={card.link} title="Посмотреть в полном размере"
                 onClick={handleClick}/>
            <h2 className="element__title">{card.name} </h2>
            <div className="element__like-container">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"
                        aria-label="Нравится"> </button>
                <span className="element__button-heart-count">{card.likes.length} </span>
            </div>
        </article>
    )

}
export default Card;