import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay}
      onSubmit={handleAddPlaceSubmit}
      isLoading={props.isLoading}
      name={"mesto"}
      title={"Новое место"}
      button={"Создать"}
      buttonLoading={"Создание..."}
    >
      <input
        className="popup__input popup__input_field_mesto"
        id="mesto-input"
        type="text"
        name="mesto"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        onChange={handleChangeName}
        value={name ?? ""}
        required
      />
      <span className="popup__input-error mesto-input-error"></span>
      <input
        className="popup__input popup__input_field_link"
        id="link-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        value={link ?? ""}
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
