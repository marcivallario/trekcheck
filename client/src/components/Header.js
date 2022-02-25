import logo from '../assets/logo.png'
import { NavLink, useHistory } from "react-router-dom";

function Header({ user, setUser }) {
    let history = useHistory();
    
    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setUser(''))
        .then(history.push('/'))
    }

    if (user) {
        return (
            <div id="header">
                <div id="logo-container">
                    <NavLink
                        to="/" 
                        exact
                        > 
                        <img src={logo} alt="logo"/>
                    </NavLink>
                </div>
            <nav>
                <ul>
                    <li id="welcome-greeting">Welcome, {user.first_name} {user.last_name}.</li>
                    <li><NavLink
                            to="/" 
                            exact
                            > 
                        Dashboard
                        </NavLink></li>
                    <li><button className="auth-button" onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </div>
        )
    } else {

    }
    
   

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