import React from "react";

class ImagePopup extends React.Component {
    render() {
        return (
            <div className={`popup picture-popup popup_opacity_low ${this.props.card && "popup_opened"}`}>
                <div className="popup__image-container" >
                    <img className="popup__image" src={`${this.props.card.link}`} alt={`${this.props.card && this.props.card.name}`} />
                    <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={this.props.onClose}></button>
                    <p className="popup__caption"></p>
                </div>
            </div>
        )
    }
}

export default ImagePopup;