import React, { useEffect, useState } from 'react'

function SocialLogin() {

    // Using state to force a rerender
    const [rerender, setRerender] = useState('false')

      // LOGIN with Github
    const CLIENT_ID = '48e06549473b50a71928'

    useEffect(() => {
        // http://localhost:3000/?code=810ec099589ca972ca78
        const codeParam = new URLSearchParams(window.location.search).get('code')
        console.log(codeParam)
        
        // Saving to localStorage
        if(codeParam && (localStorage.getItem("accessToken") === null)) {
            async function getAccessToken() {
                await fetch('http://localhost:8080/api/github/getAccessToken?code=' + codeParam)
                .then((response) => {
                    return response.json()
                }).then((data) => {
                    console.log('frontend', data)
                    if(data.access_token) {
                        localStorage.setItem('accessToken', data.access_token)
                        setRerender(!rerender)
                    }
                })
            }
            getAccessToken()
        }
    }, [])
    
    const loginWithGithub = () => {
        window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
    }

    return (
        <div className="github-google">
            <h1>Login with another provider:</h1>
            <div className="github" onClick={loginWithGithub}>
                <ion-icon name="logo-github" size="large"></ion-icon>
            </div>
            <div className="google">
                <ion-icon name="logo-google" size="large"></ion-icon>
            </div>
        </div>
    )
}

export default SocialLogin
