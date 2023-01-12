import React, { useState } from 'react'
import '../styles/header.css'
import Login from './Login'
import Register from './Register'
import itemService from "../service/items"

function Header( {theme, toggleTheme, user, setUser} ) {

    const [loginWindow, setLoginWindow] = useState(false)
    const [registerWindow, setRegisterWindow] = useState(false)

    const showLoginWindow = () => {
        setLoginWindow(true)
    }

    const showRegisterWindow = () => {
        setRegisterWindow(true)
    }

    return (
        <div className="header">
            <div className="header__top-row">
                <h1>TODO</h1>
                {theme === 'light' ? 
                    <img onClick={toggleTheme} className="theme-toggle" src="/images/icon-moon.svg" alt="moon"></img> 
                    : <img onClick={toggleTheme} className="theme-toggle" src="/images/icon-sun.svg" alt="sun"></img>}
            </div>

            {!user && 
            <div className="header__not-logged-in">
                <h3 onClick={showLoginWindow}>Log In</h3>
                <h3 onClick={showRegisterWindow}>Register</h3>
            </div>}

            {user && 
            <div className="header__logged-in">
                <h3>Welcome, {user.username}</h3>
                <h3 onClick={() => {
                    localStorage.clear() 
                    setUser("")
                    itemService.setToken(null)
                }}>Logout</h3>
            </div>}

            {loginWindow && 
                <Login 
                    setUser={setUser} 
                    setLoginWindow={setLoginWindow} 
                    setRegisterWindow={setRegisterWindow} 
                />}

            {registerWindow && 
                <Register 
                    setRegisterWindow={setRegisterWindow} 
                />}
        </div>
    )
}

export default Header
