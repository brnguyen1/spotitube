var express = require('express');
var router = express.Router();
var api = require('../services/api')

router.get('/', function(req, res) {
    res.redirect(api.ytAuthLink())
});

router.get('/auth-code', function(req, res) {
    
    res.send(req.query.code)
})

module.exports = router;
