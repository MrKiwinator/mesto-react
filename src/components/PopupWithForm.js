// import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup ${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <form className="popup__form" name={props.name} noValidate>
                    <h3 className="popup__title">{props.title}</h3>
                                
                    {/* FORM FIELDS */} 
                    {props.children}
        
                    <button type="submit" className="popup__submit">{props.submit}</button>
                </form>
                <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

// class PopupWithForm extends React.Component {
//     render () {
//         return (
//             <div className={`popup ${this.props.name} ${this.props.isOpen && "popup_opened"}`}>
//                 <div className="popup__container">
//                     <form className="popup__form" name={this.props.name} noValidate>
//                         <h3 className="popup__title">{this.props.title}</h3>
                        
//                         {/* FORM FIELDS */} 
//                         {this.props.children}

//                         <button type="submit" className="popup__submit">{this.props.submit}</button>
//                     </form>
//                     <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={this.props.onClose}></button>
//                 </div>
//             </div>
//         )
//     }
// }

export default PopupWithForm;