const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/youtube',
];

function youtube_link() {
    const url = oauth2Client.generateAuthUrl({
        // If you only need one scope you can pass it as a string
        scope: scopes
    });

    return url;
}

async function youtube_access_token(code) {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    return tokens.access_token;
}

async function get_track_id(track) {
    const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client
    });

    let search_res = await youtube.search.list({
        "part": [
            "snippet"
        ],
        "maxResults": 1,
        "q": track,
        "type": "video",
    });

    return search_res.data.items[0].id.videoId;
}

function insert_track(playlist_id, track_id) {
    const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client
    });

    youtube.playlistItems.insert({
        "part": [
            "snippet"
        ],
        "resource": {
            "snippet": {
                "playlistId": playlist_id,
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": track_id,
                }
            }
        }
    })
}

async function insert_playlist(playlist) {
    const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client
    })

    let new_playlist_res = await youtube.playlists.insert({
        "part": [
            "snippet, status"
        ],
        "resource": {
            "snippet": {
                "title": playlist.name,
                "description": playlist.desc,
                "defaultLanguage": "en"
            },
            "status": {
                "privacyStatus": "public"
            }
        }
    })

    let playlist_id = new_playlist_res.data.id

    let track_ids = playlist.tracks.map(track => {
        return get_track_id(track)
    });

    track_ids.forEach(track_id => {
        insert_track(playlist_id, track_id);
    });

}

module.exports = { youtube_link, youtube_access_token, insert_playlist }
