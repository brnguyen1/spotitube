var express = require('express');
var router = express.Router();
const api = require('../services/spotify-api');
const { insert_playlist } = require('../services/youtube-api');

router.get('/', function (req, res) {
    var a_link = api.authorize_link("spotify");
    res.send(a_link);
});

router.get('/token', (req, res) => {
    try {
        api.authorize_code(req.query.code).then(resp => {
            if (resp == undefined) {
                return res.json({ error: "Refresh token error" })
            }

            return res.json(resp.data.access_token);
        })
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }

})

router.get('/playlists', (req, res) => {
    api.get_playlists(req.query.accessToken).then(resp =>
        res.json(resp.data)
    )
})

router.post('/playlists', async (req, res) => {
    let playlist = await api.get_tracks(req.body.playlist, req.body.accessToken)
    insert_playlist(playlist)
    res.send(playlist)
})

module.exports = router;