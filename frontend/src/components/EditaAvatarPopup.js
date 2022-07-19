import React, {useRef} from "react"
import PopupWithForm from "./PopupWithForm";

const EditaAvatarPopup = (props) => {

    const ref = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar_profile: ref.current.value,
        });
    }

    React.useEffect(() => {
        ref.current.value = '';
    }, [props.isOpen]);

    return (

        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='addAvatar'
            form='avatarForm'
            title='Обновить аватар'
            buttonText='Сохранить'>
            <input ref={ref} className="popup__input" id="popup__placeAvatar-input"
                   name="avatar" placeholder="Ссылка на картинку" required type="url"/>
            <span id="popup__placeAvatar-input-error" className="popup__input-error">
                            </span>
        </PopupWithForm>
    )
}

export default EditaAvatarPopup;