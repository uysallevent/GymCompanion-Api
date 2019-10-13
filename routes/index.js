var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/authentication', function(req, res, next) {
  const {Username,Password}=req.body;
  
});

module.exports = router;
