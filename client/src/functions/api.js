import axios from "axios"

// Spotify
function getSpotifyAccessLink() {
    return axios.get(import.meta.env.VITE_BACKEND + 'spotify/')
}

function getSpotifyAccessToken(code) {
    return axios.get(import.meta.env.VITE_BACKEND + 'spotify/token', { params: { code: code } }).then(res => {
        sessionStorage.setItem("spotifyAccessToken", res.data);
    })
}

function getPlaylists() {
    return axios.get(import.meta.env.VITE_BACKEND + "spotify/playlists", { params: { accessToken: sessionStorage.getItem("spotifyAccessToken") } })
}

function postPlaylist(item) {
    return axios.post(import.meta.env.VITE_BACKEND + "spotify/playlists", { accessToken: sessionStorage.getItem("spotifyAccessToken"), playlist: item })
}

// Youtube
function getYoutubeAccessLink() {
    return axios.get(import.meta.env.VITE_BACKEND + 'youtube/')
}

function getYoutubeAccessToken(code) {
    return axios.get(import.meta.env.VITE_BACKEND + 'youtube/token', { params: { code: code } }).then(res => {
        sessionStorage.setItem("youtubeAccessToken", res.data);
    })
}


export { getSpotifyAccessLink, getSpotifyAccessToken, getYoutubeAccessLink, getYoutubeAccessToken, getPlaylists, postPlaylist }