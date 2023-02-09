const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
const githubRouter = require('express').Router()

const CLIENT_ID = "48e06549473b50a71928";
const CLIENT_SECRET = "70cdf139860dd0a542faef3e79f68c52389330d4";

githubRouter.get('/getAccessToken', async function (req, res){

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

githubRouter.get('/getUserData', async function(req, res) {
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization" : req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

module.exports = githubRouter