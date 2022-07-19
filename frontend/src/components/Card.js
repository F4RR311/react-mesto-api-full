import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "" : "element__trash_hidden"
  }`;  
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__caption-like ${
    isLiked ? "element__caption-like_aktive" : ""
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteConfirmClick() {
    props.onCardConfirmDelete(props.card);
  }

  return (
    <li className="element elements__item">
      <div
        className="element__card"
        onClick={handleCardClick}
        style={{ backgroundImage: `url(${props.card.link})` }}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteConfirmClick}
        type="button"
        aria-label="Удалить."
      ></button>
      <div className="element__caption">
        <h2 className="element__caption-text">{props.card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравится."
          ></button>
          <p className="element__caption-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
