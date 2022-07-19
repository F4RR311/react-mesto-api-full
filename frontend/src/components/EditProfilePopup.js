import PopupWithForm from "./PopupWithForm";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setAbout(e.target.value);
  }

  function handleEditProfileSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay}
      onSubmit={handleEditProfileSubmit}
      isLoading={props.isLoading}
      name={"profile"}
      title={"Редактировать профиль"}
      button={"Сохранить"}
      buttonLoading={"Сохранение..."}
    >
      <input
        className="popup__input popup__input_field_name"
        id="name-input"
        type="text"
        name="name"
        onChange={handleNameChange}
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        value={name ?? ""}
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        className="popup__input popup__input_field_job"
        id="job-input"
        type="text"
        name="about"
        onChange={handleDescriptionChange}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={about ?? ""}
        required
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
