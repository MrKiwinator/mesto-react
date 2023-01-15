import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditProfileOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            isImagePopupOpen: false,
            selectedCard: null,
        }
    }

    handleEditAvatarClick = () => {
        this.setState({
            isEditAvatarPopupOpen: !this.state.isEditAvatarPopupOpen,
        })
    }

    handleEditProfileClick = () => {
        this.setState({
            isEditProfileOpen: !this.state.isEditProfileOpen,
        })
    }

    handleAddPlaceClick = () => {
        this.setState({
            isAddPlacePopupOpen: !this.state.isAddPlacePopupOpen,
        })
    }

    setSelectedCard = (card) => {
        this.setState({
            selectedCard: card,
        })
    }

    closeAllPopups = () => {
        this.setState({
            isEditProfileOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: null,
        })
    }

    render() {
        return (
            <>
                <Header />
                
                <Main onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} onEditAvatar={this.handleEditAvatarClick} onCardClick={this.setSelectedCard} />
        
                <Footer />
        
                <ImagePopup 
                    card={this.state.selectedCard} 
                    onClose={this.closeAllPopups} 
                />
        
                <PopupWithForm name="edit-profile" title="Редактировать профиль" submit="Сохранить" isOpen={this.state.isEditProfileOpen} onClose={this.closeAllPopups}>
                    <label className="popup__input-field">
                        <input id="username-input" type="text" name="user_name" className="popup__input popup__input_type_username" placeholder="Имя пользователя" required minLength="2" maxLength="40" />
                        <span className="popup__input-error username-input-error"></span>
                    </label>
        
                    <label className="popup__input-field">
                        <input id="user-status-input" type="text" name="user_status" className="popup__input popup__input_type_userstatus" placeholder="Занятие" required minLength="2" maxLength="200" />
                        <span className="popup__input-error user-status-input-error"></span>
                    </label>
                </PopupWithForm>
        
                <PopupWithForm name="add-place" title="Новое место" submit="Сохранить" isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}>
                    <label className="popup__input-field">
                        <input id="picture-name-input" type="text" name="name" placeholder="Название" className="popup__input popup__input_type_picture-name" required minLength="2" maxLength="30" />
                        <span className="popup__input-error picture-name-input-error"></span>
                    </label>
                            
                    <label className="popup__input-field">
                        <input id="picture-link-input" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_type_picture-link" required />
                        <span className="popup__input-error picture-link-input-error"></span>
                    </label>
                </PopupWithForm>
        
                <PopupWithForm name="edit-avatar" title="Обновить аватар" submit="Сохранить" isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}>
                    <label className="popup__input-field">
                            <input id="avatar-link-input" type="url" name="user_avatar" placeholder="Ссылка на картинку" className="popup__input popup__input_type_picture-link" required />
                            <span className="popup__input-error avatar-link-input-error"></span>
                    </label>
                </PopupWithForm>
        
                <PopupWithForm name="delete-image" title="Вы уверены?" submit="Да" onClose={this.closeAllPopups} />
            </>
        );
    }
}

export default App;
