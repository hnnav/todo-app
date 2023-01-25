const githubRouter = require('express').Router()
require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

GITHUB_CLIENT_ID='48e06549473b50a71928'
GITHUB_SECRET='7fd7961c1a78a7497c052126f4fe63d17852e83b'

// GET AccessToken
githubRouter.get('/getAccessToken', async (req, res) => {

    console.log(req.query.code)

    const params = '?client_id' +  GITHUB_CLIENT_ID + '&client_secret=' + GITHUB_SECRET + '&code=' + req.query.code

    await fetch('https://github.com/login/oauth/access_token' + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log('github router getAccessToken:', data)
        res.json(data)
    })
})

// GET UserData, pass in accessToken as authorization header
githubRouter.get('/getUserData', async (req, res) => {
    req.get('Authorization')
    await fetch('https://api.github.com/user', {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization") // Bearer <accesstoken>
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        res.json(data)
    })
})
  
module.exports = githubRouter