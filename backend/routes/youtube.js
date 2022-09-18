var express = require('express');
var router = express.Router();
var api = require('../services/api')

ytToken = '';
tracksSearch = [];
playlistName = 'lifted'

router.get('/', function(req, res) {
    console.log(api.ytAuthUrl);
    res.redirect(api.ytAuthUrl);
});

router.get('/auth-code', function(req, res) {
    api.setCredentials(req.query.code);
    res.send(req.query.code);
})

router.post('/song', async function(req, res){
    playlistName = req.body.data.name;
    rawTracks = await api.getPlaylistTracks(req.body.data.tracks.href);
    tracksSearch = api.parseTracks(rawTracks);
})

router.get('/playlist', function(req, res){
    api.makePlaylist(playlistName, tracksSearch);
})

module.exports = router;
