var express = require('express');
var router = express.Router();

const api = require('../services/api')

var accessToken ='blank';

router.post('/', function(req, res) {
    accessToken = api.authorize_code(req.body.queryCode);
    console.log(accessToken);
    res.send(accessToken);
})

router.get('/', function(req, res) {
    res.send(accessToken);
})

module.exports = router;