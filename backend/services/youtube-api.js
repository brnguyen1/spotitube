const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUIBE_CLIENT_ID,
    process.env.YOUTUIBE_CLIENT_SECRET,
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

module.exports = { youtube_link }
