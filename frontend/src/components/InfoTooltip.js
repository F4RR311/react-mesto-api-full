import React from "react";
import Ok from "../images/popup/Ok.svg";
import No from "../images/popup/No.svg";

function InfoToolTip(props) {
  return (
    <section
      className={`popup popup_type_status-reg  ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className={`popup__container-status`}>
        <button
          onClick={props.onClose}
          className="popup__button-close"
          type="button"
          aria-label="Закрыть окно."
        ></button>
        <img
          src={props.isRegistered ? Ok : No}
          className="popup__status-image"
          alt="Статус."
        />
        <h2 className="popup__title">
          {props.isRegistered
            ? "Вы успешно зарегистрировались!"
            : `${props.errorMessage}`}
        </h2>
      </div>
    </section>
  );
}

export default InfoToolTip;
