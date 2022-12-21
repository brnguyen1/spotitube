var express = require('express');
var router = express.Router();
var api = require('../services/youtube-api')

router.get('/', function (req, res) {
    var a_link = api.youtube_link();
    res.send(a_link)
});

router.get('/token', async function(req, res) {
    let accessToken = await api.youtube_access_token(req.query.code)
    res.json(accessToken)
})

module.exports = router;
