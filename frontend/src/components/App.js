import {useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api.js"
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup";
import EditaAvatarPopup from "./EditaAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import * as auth from '../utils/auth.js'
import {Routes, Route, Navigate, useNavigate, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import resolve from "../images/resolve.svg"
import reject from "../images/reject.svg"


function App() {

    const navigate = useNavigate();
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [emailName, setEmailName] = useState(null);
    const [popupImage, setPopupImage] = useState('');
    const [popupTitle, setPopupTitle] = useState('');
    const [infoTooltip, setInfoTooltip] = useState(false);
    const [isReg, setIsReg] = useState(false);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleEditPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setSelectedCard(null)
        setInfoTooltip(false)
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth
                .getToken(jwt)
                .then((res) => {
                    handleLogin();
                    navigate('/');
                    setEmailName(res.email);
                })
                .catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        handleTokenCheck();
        if (isLoggedIn) {
            const token = localStorage.getItem('jwt');
            Promise.all([api.getProfile(token), api.getInitialCards(token)])
                .then(([userData, cardData]) => {
                    handleTokenCheck();
                    setCurrentUser(userData)
                    setCards(cardData)
                })
                .catch((err) => console.log(`Ошибка ${err}`));
        }

    }, [isLoggedIn]);


    useEffect(() => {
        const token = localStorage.getItem('jwt');
        api
            .getInitialCards(token)
            .then((cards) => setCards(cards))
            .catch((err) => console.log(err));
    }, []);

    /* Вход */
    function onLogin(email, password) {
        auth
            .loginUser(email, password)
            .then((res) => {
                localStorage.setItem("jwt", res.token);
                handleLogin();
                setEmailName(email);
                navigate('/');

            })
            .catch(() => {
                setIsReg(false)
                setPopupImage(reject);
                setPopupTitle('Что-то пошло не так! Попробуйте ещё раз');
                handleInfoTooltip();
            })
    }


    function onRegister(email, password) {
        auth.registerUser(email, password)
            .then((res) => {
                if (res) {
                    setIsReg(true);
                    setPopupImage(resolve);
                    setPopupTitle('Вы успешно зарегистрировались');
                    navigate('/sign-in');
                }
            })
            .catch(() => {
                setIsReg(false);
                setPopupImage(reject);
                setPopupTitle("Что-то пошло не так! Попробуйте ещё раз");
            })
            .finally(handleInfoTooltip(true));
    }



    function signOut() {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setEmailName(null);
        navigate("/sign-in");
    }


    function handleUpdateUser(data) {
        const token = localStorage.getItem('jwt');
        api.editProfile(data, token).then((newUser) => {
            setCurrentUser(newUser);
            closeAllPopups();
        })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleUpdateAvatar(data) {

        const token = localStorage.getItem('jwt');
        api.addAvatar(data, token).then((newAvatar) => {
            setCurrentUser(newAvatar);
            closeAllPopups();
        })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleInfoTooltip() {
        setInfoTooltip(true);
    }
    function handleLogin() {
        setIsLoggedIn(true);
    }


    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i === currentUser._id);
        const token = localStorage.getItem('jwt');

        // Отправляем запрос в API и получаем обновлённые данные карточки
        const changeLikeCardStatus = !isLiked
            ? api.addLike(card._id, token)
            : api.deleteLike(card._id, token);
        changeLikeCardStatus
            .then((newCard) => {
                setCards((item) => item.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(`Ошибка ${err}`));
    }

    const handleCardDelete = (card) => {
        const token = localStorage.getItem('jwt');
        api
            .removeCard(card._id, token)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка ${err}`));
    };

    function handleAddPlaceSubmit(data) {
        const token = localStorage.getItem('jwt');


        api.addCard(data, token).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard) {
            function handleEsc(evt) {
                if (evt.key === 'Escape') {
                    closeAllPopups();
                }
            }

            document.addEventListener('keydown', handleEsc);

            return () => {
                document.removeEventListener('keydown', handleEsc);
            }
        }
    }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, selectedCard]);


    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className="wrapper">
                <div className="page">

                    <Routes>
                        <Route path="/sign-in" element={
                            <>
                                <Header  title="Регистрация" route="/sign-up"/>
                                <Login onLogin={onLogin}/>
                            </>
                        }/>

                        <Route path="/sign-up" element={
                            <>
                                <Header title="Войти" route="/sign-in"/>
                                <Register onRegister={onRegister}/>
                            </>
                        }/>

                        <Route exact path="/" element={
                            <>
                                <Header title="Выйти" email={emailName} onClick={signOut} route=""/>
                                <ProtectedRoute
                                    component={Main}
                                    isLogged={isLoggedIn}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleEditPlaceClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                                <Footer/>
                            </>
                        }/>

                        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>}/>
                    </Routes>

                    <EditaAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <EditProfilePopup
                        onClose={closeAllPopups}
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser}
                    />
                    <InfoTooltip
                        image={popupImage}
                        title={popupTitle}
                        isOpen={infoTooltip}
                        onClose={closeAllPopups}/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
