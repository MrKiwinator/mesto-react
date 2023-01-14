import React from "react";

class Card extends React.Component {
    handleCardClick = () => {
        console.log(this.props.card)
        this.props.onCardClick(this.props.card);
    }

    render() {
        return (
            <article className="element" >
                <img className="element__picture" src={this.props.card.link} alt={this.props.card.name} onClick={this.handleCardClick} />
                <div className="element__note">
                    <h2 className="element__place">{this.props.card.name}</h2>
                    <div className="element__like-container">
                        <button type="button" aria-label="Нравится" className="element__like"></button>
                        <span className="element__like-counter">{this.props.card.likes.length}</span>
                    </div>
                </div>
                <button type="button" aria-label="Удалить" className="element__delete"></button>
            </article>
        )
    }
}

export default Card;