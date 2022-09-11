const port = 8888;
const queryString = require("node:querystring")
const axios = require("axios")
const express = require('express')
var app = express();
app.set('views', './views')
app.set('view engine', 'pug')

require('dotenv').config()

var access_token;
var user_id;

scopes = ['user-top-read', 'playlist-modify-private', 'playlist-modify-public']

app.get('/', function(req, res) {
    var authorization_link = "https://accounts.spotify.com/authorize?client_id=" + process.env.CLIENT_ID + "&response_type=code&redirect_uri=" + encodeURIComponent(process.env.REDIRECT_URI) + "&scope=" + encodeURIComponent(scopes.join(' '));
    console.log(authorization_link);
    res.render('index', {authorization_link: authorization_link});
});

app.get('/callback', async(req, res) => {
    const spotifyResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: process.env.REDIRECT_URI,
        }),
        {
            headers: {
                Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }
    );
    
    console.log(spotifyResponse.data);
    res.redirect('/user')

    access_token = spotifyResponse.data.access_token;
})

app.get('/user', async(req, res) => {
    console.log('user redirect')
    const user = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
            headers: {
                Authorization: "Bearer " + access_token
            }
        }

    )
    
    var playlistCount = Object.keys(user.data).length;
    console.log(user.data)
    res.send(user.data.name)

})


app.listen(port)