import React, { useState } from 'react'
import axios from 'axios'

function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function registerUser(e) {
        e.preventDefault();

        const newUser = {
            username: username,
            email: email,
            password: password,
        }

        axios.post('http://localhost:8080/api/users/', newUser)
        .then(res => console.log(res.data));

        // Clear input field after submit
        // e.target.input.value = ""
    }

    return (
        <form className="register-form" onSubmit={registerUser}>
            <h3>Register here:</h3>
            <input 
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
            />
            <input 
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
            <input 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <input type="submit" value="Register" />
        </form>
    )
}

export default Register
