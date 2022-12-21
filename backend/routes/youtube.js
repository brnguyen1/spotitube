var express = require('express');
var router = express.Router();
var api = require('../services/youtube-api')

router.get('/', function (req, res) {
    var a_link = api.youtube_link();
    res.send(a_link)
});


router.get('/auth-code', function(req, res) {
    ssn = req.session
    console.log(ssn.accessToken)
})

module.exports = router;
