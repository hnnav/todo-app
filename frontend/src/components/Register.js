import React, { useState } from 'react'
import userService from "../service/users"

function Register(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function registerUser(e) {
        e.preventDefault();
        const newUser = {
            username: e.target.username.value,
            password: e.target.password.value,
        }
        userService.createNewUser(newUser)
        handleClose()
    }

    const handleClose = () => {
        props.setRegisterWindow(false)
    }

    return (
        <form className="register-form" onSubmit={registerUser}>
            <h3>Register</h3>
            <input 
                placeholder="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
            />
            <input 
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <input type="submit" value="Register" />
        </form>
    )
}

export default Register
