import React from "react";

const ImagePopup = ({card, onClose}) => {

    return (
        <div className={`popup popup_image  ${card && 'popup_opened'} `} id="popupImage">
            <div className="popup__image-container">
                <button onClick={onClose} className="popup__close"
                        type="button" aria-label="Закрыть"> </button>
                <figure className="popup__image-figure">
                    <img className="popup__image" src={card?.link }
                         alt={card ? card.name : ''}/>
                    <figcaption className="popup__image-name">{card?.name } </figcaption>
                </figure>
            </div>

        </div>
    )
}

export default ImagePopup;