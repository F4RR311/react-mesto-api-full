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
import * as auth from '../utils/auth'
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
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

    useEffect(() => {

        if (isLoggedIn) {
            Promise.all([api.getProfile(), api.getInitialCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user)
                    setCards(cards)
                })
                .catch((err) => {
                    console.error(err);
                });
        }

    }, [isLoggedIn]);


    /* Вход */
    function onLogin(email, password) {
        auth.loginUser(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                handleTokenCheck();
                setIsLoggedIn(true);
                setEmailName(res.email);
                navigate('/');
            })
            .catch(() => {
                setPopupImage(reject);
                setPopupTitle('Что-то пошло не так! Попробуйте ещё раз');
                handleInfoTooltip();
            })
    }

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate('/');
        }
    }, [isLoggedIn, navigate])

    useEffect(() => {
        handleTokenCheck();
    }, []);

    function onRegister(email, password) {
        auth.registerUser(email, password)
            .then((res) => {
                setPopupImage(resolve);
                setPopupTitle('Вы успешно зарегистрировались');
                navigate('/sign-in');
            })
            .catch(() => {
                setPopupImage(reject);
                setPopupTitle("Что-то пошло не так! Попробуйте ещё раз");
            })
            .finally(handleInfoTooltip(true));
    }


    function handleTokenCheck() {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            api.getProfile()
            auth.getToken(jwt)
                .then((res) => {
                    if (res.data?.email) {
                        setIsLoggedIn(true);
                        navigate('/');
                        setEmailName(res.data.email);
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    function signOut() {
        setIsLoggedIn(false);
        setEmailName(null);
        navigate("/sign-in");
        localStorage.removeItem("jwt");
    }

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

    function handleUpdateUser(data) {
        api.editProfile(data).then((newUser) => {

            setCurrentUser(newUser);
            closeAllPopups();
        })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleUpdateAvatar(data) {
        api.addAvatar(data).then((newAvatar) => {
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

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeStatusLike(card._id, isLiked)
            .then((newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                // Обновляем стейт
                setCards(newCards);
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });

    }

    function handleCardDelete(card) {
        api.removeCard(card).then(() => {
            setCards((items) => items.filter((c) => c._id !== card._id && c));
        }).catch((err) => {
            console.error(err);
        });
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data).then((newCard) => {
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
                                <Header title="Регистрация" route="/sign-up"/>
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
                                <Header title="Выйти" mail={emailName} onClick={signOut} route=""/>
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
