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
            handleClose()
        } catch (exception) {
            console.error(exception)
        }
    }

    const handleClose = () => {
        props.setLoginWindow(false)
    }
    
    return (
        <form className="login-form" onSubmit={handleLogin}>
            <div className="login__top-row">
                <h3>Login here:</h3>
                <ion-icon name="close-outline" onClick={handleClose}></ion-icon>
            </div>
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
