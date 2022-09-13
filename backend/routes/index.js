var express = require('express');
var router = express.Router();

const api = require('../services/api')

/* GET home page. */
router.get('/', function(req, res) {
  var a_link = api.authorize_link();
  res.send(a_link);
});

module.exports = router;
