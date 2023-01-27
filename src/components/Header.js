import logoPath from "../images/logo.svg";

function Header() {
    return (
        <header className="header">
            <img alt="Логотип" className="header__logo" 
                src={logoPath} 
            />
        </header>
    )
}

export default Header;