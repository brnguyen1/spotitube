function youtubeLogOut() {
    sessionStorage.removeItem("youtubeAccessToken");
}

function spotifyLogOut() {
    sessionStorage.removeItem("spotifyAccessToken");
}

export { spotifyLogOut, youtubeLogOut }