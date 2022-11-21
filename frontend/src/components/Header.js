import React from 'react'

function Header( {theme, toggleTheme} ) {
    return (
        <div className="header">
            <h1>TODO</h1>
            {theme === 'light' ? 
                <img onClick={toggleTheme} className="theme-toggle" src="/images/icon-moon.svg" alt="moon"></img> 
                : <img onClick={toggleTheme} className="theme-toggle" src="/images/icon-sun.svg" alt="sun"></img>}
        </div>
    )
}

export default Header
