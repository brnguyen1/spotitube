const axios = require('axios')
const queryString = require("node:querystring")

scopes = ['user-top-read', 'playlist-modify-private', 'playlist-modify-public']

function authorize_link() {
    var authorization_link = "https://accounts.spotify.com/authorize?client_id=" + process.env.CLIENT_ID + "&response_type=code&redirect_uri=" + encodeURIComponent(process.env.REDIRECT_URI) + "&scope=" + encodeURIComponent(scopes.join(' '));
    console.log(authorization_link);
    return authorization_link;
}

 function authorize_code(query_code) {
    // let tokenLink = queryString.stringify({
    //     grant_type: "authorization_code",
    //     code: query_code,
    //     redirect_uri: process.env.REDIRECT_URI,
    //     client_id: process.env.CLIENT_ID,
    //     client_secret: process.env.CLIENT_SECRET
    // });

    // console.log(tokenLink)
    const spotifyResponse = axios.post(
        "https://accounts.spotify.com/api/token?", 
        {
            params: {
                grant_type: "authorization_code",
                code: query_code,
                redirect_uri: process.env.REDIRECT_URI,
            }
        },
        {
            headers: {
                Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
                'Content-Type':'application/x-www-form-urlencoded'
            },
        }
    );

    
    console.log(spotifyResponse.data);

    return spotifyResponse.data.access_token;
}

async function playlists(access_token) {
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

}

module.exports ={authorize_link, authorize_code, playlists}