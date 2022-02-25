import { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";

function Login({ setUser }) {
    let history = useHistory();
    const [ loginData, setLoginData ] = useState({
        email: '',
        password: ''
    })
    const [ errors, setErrors ] = useState(null)

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(user => {
                    setUser(user)
                    history.push("/")
                })
             } else {
                res.json().then(errorResponse => setErrors(errorResponse))
            }
        })
    }
    
    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setLoginData({...loginData, [key]: value})
    }
    
    return (
        <div id="login">
            <div id="login-container">
                <h1>Login</h1>
                <form id="login-form" onSubmit={handleSubmit}>
                    <input name="email" placeholder="Email" className="user-input" onChange={handleChange}></input>
                    <input name="password" type="password" placeholder="Password" className="user-input" onChange={handleChange}></input>
                    {errors ? <div className="error-container"><p className="error">{errors.error}</p></div> : <div></div>}
                    <input type="submit" value="Login" className="form-button"></input>
                </form>
                <div id="call-to-signup">
                    <p>Not a member? <NavLink
                                to="/signup" 
                                exact
                                activeStyle={{
                                textDecoration: "underline",
                                }}>Sign up now! </NavLink></p>
                </div>
            </div>
        </div>
    )
}

export default Login;