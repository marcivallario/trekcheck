import { useHistory, NavLink } from "react-router-dom";
import { useState } from 'react';

function Signup({ setUser }) {
    let history = useHistory();
    const [ formData, setFormData ] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })
    const [ errors, setErrors ] = useState([])

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(setUser)
                history.push("/")
                setFormData({
                    email: '',
                    password: ''
                })
            } else {
                res.json().then(errorResponse => setErrors(errorResponse.errors))
            }
        })
    }

    return (
        <div id="signup">
            <div id="signup-container">
                <h1>Sign Up</h1>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <input name="first_name" placeholder="First Name" className="user-input" onChange={handleChange}></input>
                    <input name="last_name" placeholder="Last Name" className="user-input" onChange={handleChange}></input>
                    <input name="email" placeholder="Email" className="user-input" onChange={handleChange}></input>
                    <input name="password" type="password" placeholder="Password" className="user-input" onChange={handleChange}></input>
                    {errors.length > 0 ? <div className="error-container">{errors.map(error => <p className="error" key={error}>{error}</p>)}</div> : <div></div>}
                    <input type="submit" value="Sign Up" className="form-button"></input>
                </form>
                <div id="call-to-login">
                    <p>Already a member? <NavLink
                                to="/login" 
                                exact
                                activeStyle={{
                                textDecoration: "underline",
                                }}>Log in here. </NavLink></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;