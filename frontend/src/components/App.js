import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    link: "",
    name: "",
  });
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmDeletePopupOpen ||
    selectedCard.isOpen;
  const [isRegistered, setIsRegistered] = useState();
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(alert);
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(alert);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((c) => c._id !== selectedDeleteCard._id)
        );
        closeAllPopups();
      })
      .catch(alert)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name,
    });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data.name, data.about)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(alert)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .changeUserAvatar(data.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(alert)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlace(data) {
    setIsLoading(true);
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(alert)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDelete(card) {
    setSelectedDeleteCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoToolTipOpen(true);
  }

  function handleBurgerMenuOpen() {
    if (isBurgerMenuOpen === false) {
      setIsBurgerMenuOpen(true);
    } else {
      setIsBurgerMenuOpen(false);
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setErrorMessage("");
    setSelectedCard({
      isImageOpen: false,
      link: "",
      name: "",
    });
  }

  function closePopupOnOverlay(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  function handleLogin({ email, password }) {
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          tokenCheck();
        }
      })
      .catch((err) => {
        setErrorMessage(err);
        setIsRegistered(false);
        handleInfoTooltipOpen();
      });
  }

  function handleRegister({ email, password }) {
    return auth
      .register(email, password)
      .then(() => {
        setIsRegistered(true);
        handleInfoTooltipOpen();
        history.push("/singin");
      })
      .catch((err) => {
        setErrorMessage(err);
        setIsRegistered(false);
        handleInfoTooltipOpen();
      });
  }

  useEffect(() => {
    function closePopupOnEsc(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closePopupOnEsc);
      return () => {
        document.removeEventListener("keydown", closePopupOnEsc);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tokenCheck() {
    auth
      .getContent()
      .then((res) => {
        if (res.email) {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch(alert);
  }

  function handleSignOut() {
    auth.logout()
    .then(() => {
      setLoggedIn(false);
      setEmail("");
      setIsBurgerMenuOpen(false);
      history.push("/signin");
    })
    .catch(alert);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          loggedIn={loggedIn}
          isBurgerOpen={isBurgerMenuOpen}
          handleSignOut={handleSignOut}
          burgerOpen={handleBurgerMenuOpen}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardConfirmDelete={handleConfirmDelete}
          />
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="signin" />}
          </Route>
        </Switch>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={closePopupOnOverlay}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={closePopupOnOverlay}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={closePopupOnOverlay}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={closePopupOnOverlay}
          onConfirmDelete={handleConfirmDelete}
          onDeleteCard={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseOverlay={closePopupOnOverlay}
        />

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          isRegistered={isRegistered}
          onClose={closeAllPopups}
          onCloseOverlay={closePopupOnOverlay}
          errorMessage={errorMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
