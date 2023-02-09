import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'

function SocialLogin({ user, setUser}) {

    const [rerender, setRerender] = useState(false)

    const CLIENT_ID = "48e06549473b50a71928"
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get("code") 

    async function getAccessToken() {
      await fetch("http://localhost:8080/api/github/getAccessToken?code=" + codeParam, {
        method: "GET"
      }).then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data)
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token)
          setRerender(!rerender)
        }
      })
      getUserData()
    }

    function loginWithGithub() {
      window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
    }   

    async function getUserData() {
      await fetch("http://localhost:8080/api/github/getUserData", {
        method: "GET",
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem("accessToken")
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data)
        setUser(data)
      })
    }   

    useEffect(() => {
      if (codeParam && (localStorage.getItem("accessToken") === null)) {
        getAccessToken()
      }
    }, [])  

    useEffect(() => {
      getUserData()
    }, [])  

    return (
      <div className="SocialLogin">
        {localStorage.getItem("accessToken") && Object.keys(user).length !== 0 ?


          <div className="header__logged-in">
            <h3>Welcome, {user.login}</h3>
            <h3 className="logout" onClick={() => {localStorage.removeItem("accessToken"); setRerender(!rerender) }}>
              Log out
            </h3>
          </div>



        :
            <div className="github-google">
                <h1>Login with another provider:</h1>
                <div className="github" onClick={loginWithGithub}>
                    <ion-icon name="logo-github" size="large"></ion-icon>
                </div>
                <div className="google">
                    <ion-icon name="logo-google" size="large"></ion-icon>
                </div>
            </div>
        }
      </div>
    )
}

export default SocialLogin
