const axios = require('axios');
const queryString = require("node:querystring");
const {google} = require('googleapis');

// SPOTIFY FUNCTIONS
scopes = ['user-top-read', 'playlist-modify-private', 'playlist-modify-public']

function authorize_link() {
    var authorization_link = "https://accounts.spotify.com/authorize?client_id=" + process.env.SPOTIFY_CLIENT_ID + "&response_type=code&redirect_uri=" + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI) + "&scope=" + encodeURIComponent(scopes.join(' '));
    console.log(authorization_link);
    return authorization_link;
}

 async function authorize_code(query_code) {
    try{
        let tokenLink = queryString.stringify({
            grant_type: "authorization_code",
            code: query_code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        });

        const spotifyResponse = await axios.post(
            "https://accounts.spotify.com/api/token", data=tokenLink,
            {
                headers: {
                    Authorization: "Basic " + process.env.SPOTIFY_BASE64_AUTHORIZATION,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
            }
        );
        
        console.log(spotifyResponse.data.access_token);

        return spotifyResponse.data.access_token;
    }
    catch(error){
        console.log(error);
    }
}

// YOUTUBE FUNCTIONS
const ytScopes = ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtubepartner']

const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
);

function ytAuthLink() {
    const ytAuthUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',

    scope: ytScopes
    });

    return ytAuthUrl;
}

function ytGetToken(query_code){
    let { tokens } = oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(tokens);
}

module.exports ={authorize_link, authorize_code, ytAuthLink, ytGetToken}