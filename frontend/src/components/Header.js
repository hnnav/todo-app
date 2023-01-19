import React from 'react'
import '../styles/header.css'
import Login from './Login'
import Register from './Register'
import itemService from "../service/items"

function Header( {theme, toggleTheme, user, setUser, createNotification} ) {

    return (
        <div className="header">
            <div className="header__top-row">
                <h1>TODO</h1>
                {theme === 'light' ? 
                    <img onClick={toggleTheme} className="theme-toggle" src="/images/icon-moon.svg" alt="moon"></img> 
                    : <img onClick={toggleTheme} className="theme-toggle" src="/images/icon-sun.svg" alt="sun"></img>}
            </div>

            {/* Not Logged In */}
            {!user && 
            <div className="header__not-logged-in">
                <Login setUser={setUser} createNotification={createNotification}/>
                <Register createNotification={createNotification}/>
            </div>}

            {/* Logged In */}
            {user && 
            <div className="header__logged-in">
                <h3>Welcome, {user.username}</h3>
                <h3 onClick={() => {
                    localStorage.clear() 
                    setUser("")
                    itemService.setToken(null)
                }}>Logout</h3>
            </div>}
        </div>
    )
}

export default Header
