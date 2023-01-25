import React from 'react'
import toast from 'react-hot-toast'
import '../styles/header.css'
import Login from './Login'
import Register from './Register'
import itemService from "../service/items"
import SocialLogin from './SocialLogin'

function Header({ theme, toggleTheme, user, setUser }) {

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
                <div className="login-register">
                    <Login setUser={setUser} />
                    <Register />
                </div>
                <div className="social-login">
                    <SocialLogin />
                </div>
            </div>}

            {/* Logged In */}
            {user && 
            <div className="header__logged-in">
                <h3>Welcome, {user.username}</h3>
                <h3 onClick={() => {
                    localStorage.clear() 
                    setUser("")
                    itemService.setToken(null)
                    toast('Logged Out', {icon: <ion-icon name="log-out-outline" size="large"></ion-icon>})
                }}>Logout</h3>
            </div>}
        </div>
    )
}

export default Header
