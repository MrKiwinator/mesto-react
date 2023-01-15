import React from "react";
import Card from "./Card";
import api from "../utils/api";

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: "",
            userDescription: "",
            userAvatar: "",
            cards: [],
        }
    }
    
    componentDidMount () {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([user, cards]) => {
                this.setState({
                    userName: user.name,
                    userDescription: user.about,
                    userAvatar: user.avatar,
                    cards: cards,
                })
            })
            .catch((err) => console.log(err))
    }
    
    render () {
        return (
            <main className="main">
    
                <section className="profile">
                    <button className="profile__edit-avatar-btn" onClick={this.props.onEditAvatar}>
                        <img src={this.state.userAvatar} alt="Аватар пользователя" className="profile__avatar" />
                    </button>
                    
                    <div className="profile__info">
                        <div className="profile__flex-container">
                            <h1 className="profile__name">{this.state.userName}</h1>
                            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={this.props.onEditProfile}></button>
                        </div>
                        <p className="profile__status">{this.state.userDescription}</p>
                    </div>
                    <button className="profile__add-button" type="button" aria-label="Добавить изображение" onClick={this.props.onAddPlace}></button>
                </section>
        
                <section className="elements" aria-label="Изображения">
                    {this.state.cards.map((card) => 
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={this.props.onCardClick}
                        />
                    )}
                </section>
        
            </main>
        )
    }
}

export default Main;