import React from 'react'

function Header( {theme, toggleTheme} ) {
    return (
        <div className="header">
            <h1>TODO</h1>
            <img onClick={toggleTheme} className="theme-toggle" src="/images/icon-moon.svg" alt="crescent moon"></img>
        </div>
    )
}

export default Header
