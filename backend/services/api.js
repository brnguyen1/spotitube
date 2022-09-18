const axios = require('axios');
const queryString = require("node:querystring");
const {google} = require('googleapis');

// SPOTIFY FUNCTIONS
scopes = ['user-top-read', 'playlist-modify-private', 'playlist-modify-public']

function authorize_link() {
    var authorization_link = "https://accounts.spotify.com/authorize?client_id=" + process.env.SPOTIFY_CLIENT_ID + "&response_type=code&redirect_uri=" + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI) + "&scope=" + encodeURIComponent(scopes.join(' '));
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
        
        return spotifyResponse.data.access_token;
    }
    catch(error){
        console.log(error);
    }
}

async function getSpotifyToken(){
    let res = await axios.get("http://localhost:8888/callback/token");
    return res.data;
}

// YOUTUBE FUNCTIONS
const ytScopes = ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtubepartner']

const oauth2Client = new google.auth.OAuth2(
    '555541083874-b1o2jhg5nlqq5d6jt8qecvav95d6tqo7.apps.googleusercontent.com',
    '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',
    'http://localhost:8888/youtube/auth-code'
  );

const ytAuthUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ytScopes
});

function setCredentials(query_code){
    let { tokens } = oauth2Client.getToken(query_code);
    oauth2Client.setCredentials(tokens);
}

async function getPlaylistTracks(endpoint){
    var token = await getSpotifyToken();
    const spotifyReponse = await axios.get(endpoint, {
        headers: {'Authorization': 'Bearer ' + token}
    })
    return spotifyReponse.data.items;
}

function parseTracks(playlist){
    tracks = [];
    for(track of playlist){
        trackName = track.track.name;
        artistName = track.track.artists[0].name;
        tracks.push(trackName + ' by ' + artistName)
    }  
}

function makePlaylist(title){
    google.youtube.playlists.insert({
        part:{
            'snippet.title': title
        }
    })
}
module.exports ={authorize_link, authorize_code, ytAuthUrl, setCredentials, getPlaylistTracks, parseTracks, makePlaylist}