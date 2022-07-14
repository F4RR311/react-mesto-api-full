import React from "react";

const PopupWithForm = (props) => {

    return (
        <div className={`popup popup_form_${props.name} ${props.isOpen ? `popup_opened` : ''}`}>
            <div className="popup__container">
                <button onClick={props.onClose} className="popup__close" type="button" aria-label="close"> </button>
                <form className="popup__form" name={props.form} onSubmit={props.onSubmit}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button onSubmit={props.onSubmit} type="submit" title="Сохранить"  className="popup__button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )

}
export default PopupWithForm;