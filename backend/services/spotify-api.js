const axios = require('axios');
const queryString = require("node:querystring");

// SPOTIFY FUNCTIONS
const spotifyScopes = ['user-top-read', 'playlist-modify-private', 'playlist-modify-public']
const ytScopes = ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtubepartner']

function authorize_link(service) {
    if (service == 'spotify') {
        var authorization_link = "https://accounts.spotify.com/authorize?client_id=" + process.env.SPOTIFY_CLIENT_ID + "&response_type=code&redirect_uri=" + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI) + "&scope=" + encodeURIComponent(spotifyScopes.join(' '));
    }
    else if (service == 'youtube') {
        var authorization_link = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=" + encodeURIComponent(ytScopes.join(' ')) + "&response_type=code&client_id=" + process.env.YOUTUBE_CLIENT_ID + "&redirect_uri=" + encodeURIComponent(process.env.YOUTUBE_REDIRECT_URI)

    }
    return authorization_link;
}

async function authorize_code(query_code) {
    try {
        let tokenLink = queryString.stringify({
            grant_type: "authorization_code",
            code: query_code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        });

        let spotifyResponse = await axios.post(
            "https://accounts.spotify.com/api/token", data = tokenLink,
            {
                headers: {
                    Authorization: "Basic " + process.env.SPOTIFY_BASE64_AUTHORIZATION,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }
        );

        return spotifyResponse;
    }

    catch (error) {
        console.log(error);
    }
}

function get_playlists(access_token) {
    return axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: { 'Authorization': 'Bearer ' + access_token }
    })
}

async function get_tracks(playlist, access_token) {
    playlist_endpoint = playlist.href + "/tracks"
    let res = await axios.get(playlist_endpoint, {
        headers: { 'Authorization': 'Bearer ' + access_token }
    })

    info = { "name": playlist.name, "desc": playlist.description, "tracks": [] }
    res.data.items.map(track => {
        info["tracks"].push(track.track.name + " by " + track.track.artists[0].name)
    })

    return info
}

module.exports = { authorize_link, authorize_code, get_playlists, get_tracks }