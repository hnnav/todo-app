import React, { useState } from 'react'
import itemService from "../service/items"
import loginService from "../service/login"

function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem("user", JSON.stringify(user))
            itemService.setToken(user.token)
            props.setUser(user)
            console.log('Login form handler:', user)
        } catch (exception) {
            console.error(exception)
        }
    }

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h3>Login</h3>
            <input 
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
            />
            <input 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <input type="submit" value="Login" />
        </form>
    )
}

export default Login
