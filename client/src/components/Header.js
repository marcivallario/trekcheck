import logo from '../assets/logo.png'
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div id="header">
            <div id="logo-container">
                <NavLink to="/" exact><img src={logo} alt="Logo" title="TrekCheck" /></NavLink>
            </div>
            <nav>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/login" exact><button className="auth">Login</button></NavLink>
                <NavLink to="/signup" exact><button className="auth">Signup</button></NavLink>
            </nav>
        </div>
    )
}

export default Header;