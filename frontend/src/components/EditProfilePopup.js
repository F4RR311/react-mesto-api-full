import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name);
            setAbout(currentUser.about);
        }
    }, [props.isOpen, currentUser]);


    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            job: about
        });
    }

    return (

        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen}
            name='editProfile'
            form='profileData'
            title='Редактировать профиль'
            buttonText='Сохранить'>
            <input className="popup__input"
                   id="popup__name-input"
                   name="profile_name"
                   type="text"
                   placeholder="Имя"
                   required minLength="2" maxLength="40"
                   onChange={handleChangeName}
                   value={name}/>
            <span id="popup__name-input-error" className="popup__input-error">
                        </span>
            <input className="popup__input"
                   name="job"
                   id="popup__job-input"
                   type="text"
                   placeholder="О себе"
                   required minLength="2" maxLength="200"
                   value={about}
                   onChange={handleChangeAbout}/>
            <span id="popup__job-input-error" className="popup__input-error">
                        </span>
        </PopupWithForm>
    )

}
export default EditProfilePopup;