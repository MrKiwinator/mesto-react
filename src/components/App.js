import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
    // Hooks:
    const [isEditProfileOpen, setEditProfileStatus] = React.useState(false);
    const [isAddPlaceOpen, setAddPlaceStatus] = React.useState(false);
    const [isEditAvatarOpen, setEditAvatarStatus] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [currentUser, setCurrentUser] = React.useState("");
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userInfo, cards]) => {
            setCurrentUser(userInfo);
            setCards(cards);
        })
        .catch((err) => console.log(err))
    }, [])
    

    function handleEditProfileClick() {
        setEditProfileStatus(!isEditProfileOpen);
    }

    function handleAddPlaceClick() {
        setAddPlaceStatus(!isAddPlaceOpen);
    }

    function handleEditAvatarClick() {
        setEditAvatarStatus(!isEditAvatarOpen);
    }

    function closeAllPopups() {
        setEditProfileStatus(false);
        setAddPlaceStatus(false);
        setEditAvatarStatus(false);
        setSelectedCard(null);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(item => item._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        api.delCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => item !== card))
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateUser(userInfo) {
        api.setUserInfo(userInfo)
            .then((res) => {
                setCurrentUser(res);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(userInfo) {
        api.setUserAvatar(userInfo.avatar)
            .then((res) => {
                setCurrentUser(res);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(() => {
                closeAllPopups();
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            
            <Main 
                cards={cards} 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike} 
                onCardDelete={handleCardDelete} 
            />
            
            <Footer />
    
            <ImagePopup 
                card={selectedCard} 
                onClose={closeAllPopups} 
            />
    
            <EditProfilePopup 
                isOpen={isEditProfileOpen} 
                onClose={closeAllPopups} 
                onUpdateUser={handleUpdateUser} 
            /> 

            <EditAvatarPopup 
                isOpen={isEditAvatarOpen} 
                onClose={closeAllPopups} 
                onUpdateAvatar={handleUpdateAvatar} 
            />
    
            <AddPlacePopup 
                isOpen={isAddPlaceOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />
    
            <PopupWithForm 
                name="delete-image" 
                title="Вы уверены?" 
                submit="Да" 
                onClose={closeAllPopups} 
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
