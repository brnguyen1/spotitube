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

async function insert_tracks(playlist_id, tracks, index = 0) {
    const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client
    });

    let curr_track = tracks[index];

    let search_res = await youtube.search.list({
        "part": [
            "snippet"
        ],
        "maxResults": 1,
        "q": curr_track,
        "type": "video",
    });

    let track_id = search_res.data.items[0].id.videoId;
    let insert_res = youtube.playlistItems.insert({
        "part": [
            "snippet"
        ],
        "resource": {
            "snippet": {
                "playlistId": playlist_id,
                "position": 0,
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": track_id,
                }
            }
        }
    })

    setTimeout(function () {
        index++;
        if (index < tracks.length)
            insert_tracks(playlist_id, tracks, index);
    }, 1000);

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

    let playlist_id = new_playlist_res.data.id;

    insert_tracks(playlist_id, playlist.tracks)

}

module.exports = { youtube_link, youtube_access_token, insert_playlist }
