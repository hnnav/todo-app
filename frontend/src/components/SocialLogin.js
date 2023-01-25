import React from 'react'
import { Link } from 'react-router-dom'

function SocialLogin() {

    return (
        <div className="github-google">
            <h1>Login with another provider:</h1>
            <div className="github">
                <ion-icon name="logo-github" size="large"></ion-icon><h3>Github</h3>
            </div>
            <div className="google">
                <ion-icon name="logo-google" size="large"></ion-icon><h3>Google</h3>
            </div>
        </div>
    )
}

export default SocialLogin
