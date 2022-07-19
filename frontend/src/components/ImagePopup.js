function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_image ${
        props.card.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__preview">
        <button
          className="popup__button-close"
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть окно."
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__caption">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
