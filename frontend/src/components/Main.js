import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__box">
          <div className="profile__avatar-box">
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
            <div
              className="profile__edit-avatar"
              onClick={props.onEditAvatar}
            ></div>
          </div>
          <div className="profile__info">
            <div className="profile__box-name">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать профиль."
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить место."
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements content__elements">
        <ul className="elements__list">
          {props.cards.map((item) => {
            return (
              <Card
                key={item._id}
                card={item}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardConfirmDelete={props.onCardConfirmDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
