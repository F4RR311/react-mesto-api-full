import React, {useEffect, useState} from "react"
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name,
            link: link
        })
    }

    useEffect(() => {
        if (props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen])


    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            name='newPlace'
            title='Новое место'
            buttonText='Создать'>
            <input onChange={handleChangeName} value={name} className="popup__input" id="popup__placeName-input"
                   name="placeName"
                   placeholder="Название"
                   required minLength="2" maxLength="30"/>
            <span id="popup__placeName-input-error" className="popup__input-error">
                        </span>
            <input onChange={handleChangeLink} value={link} className="popup__input" id="popup__placeLink-input"
                   name="placeLink"
                   placeholder="Ссылка на картинку" required type="url"/>
            <span id="popup__placeLink-input-error" className="popup__input-error">
                        </span>
        </PopupWithForm>
    )

}
export default AddPlacePopup;