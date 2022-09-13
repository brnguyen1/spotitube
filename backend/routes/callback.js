var express = require('express');
var router = express.Router();

const api = require('../services/api')

var accessToken ='blank';

router.get('/', async function(req, res) {
    accessToken = await api.authorize_code(req.query.code)
    res.redirect(process.env.CLIENTSIDE_URL + '/playlists');
})

router.get('/token', function(req, res) {
    res.send(accessToken);
})

module.exports = router;