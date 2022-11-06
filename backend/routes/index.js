var express = require('express');
var router = express.Router();

const api = require('../services/spotify-api')

/* GET home page. */
router.get('/', function(req, res) {
  var a_link = api.authorize_link("spotify");
  res.send(a_link);
});

module.exports = router;
