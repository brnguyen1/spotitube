var express = require('express');
var router = express.Router();
var api = require('../services/spotify-api')

ytToken = '';
tracksSearch = [];
playlistName = 'lifted'

router.get('/', function(req, res) {
    console.log(api.ytAuthUrl);
    res.redirect(api.ytAuthUrl);
});

router.get('/auth-code', function(req, res) {
    ssn = req.session
    console.log(ssn.accessToken)
})

module.exports = router;
