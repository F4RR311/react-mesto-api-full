import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleEditAvatarSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay}
      onSubmit={handleEditAvatarSubmit}
      isLoading={props.isLoading}
      name={"avatar"}
      title={"Обновить аватар"}
      button={"Сохранить"}
      buttonLoading={"Сохранение..."}
    >
      <input
        className="popup__input popup__input_field_avatar"
        id="avatar-input"
        type="url"
        name="link"
        ref={avatarRef}
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
