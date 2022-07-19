function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className={`popup__container-${props.name}`}>
        <button
          onClick={props.onClose}
          className="popup__button-close"
          type="button"
          aria-label="Закрыть окно."
        ></button>
        <form className={`popup__form-${props.name}`} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className="popup__button-save"
            type="submit"
            aria-label="Сохранить."
          >
            {props.isLoading ? props.buttonLoading : props.button}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
