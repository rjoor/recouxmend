const BASE = 'http://localhost:'
const PORT = process.env.port || 3001;
const express = require('express');
require('dotenv').config();
const app = express();
const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];
const SpotifyWebApi = require("spotify-web-api-node");

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
}

const spotifyApi = new SpotifyWebApi(credentials)

const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const state = generateRandomString(16)
console.log(state);

const authUrl = spotifyApi.createAuthorizeURL(scopes, state);
console.log(authUrl)

app.get('/login', (_, res) => {
    res.redirect(authUrl);
})

app.get('/callback*', (req, _) => {
    const code = req.query.code
    console.log(code);
    spotifyApi.authorizationCodeGrant(code)
        .then((data) => {
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
            console.log('success!!')
        })
        .catch((err) => {
            console.log('Oh no, something has gone horribly wrong! Namely...', err)
        })
})

app.get('/refresh', () => {
    spotifyApi.refreshAccessToken()
        .then((data) => {
            console.log('Access token refreshed! Get frickin pwned old access token!')
            spotifyApi.setAccessToken(data.body['access_token']);
        })
        .catch((err) => {
            console.log('Nice try but the old access token isn\'t ready to say bye yet!', err)
        })
})

app.get('/me', (_, res) => {
    console.log("getting info about myself!")
    spotifyApi.getMe()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('Could not get user info :(')
        })
})

app.get('/toptracks', (_, res) => {
    spotifyApi.getMyTopTracks({ limit: 50 })
        .then((data) => {
            res.send(data.body.items)
        })
        .catch((err) => {
            console.dir(err)
        })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})