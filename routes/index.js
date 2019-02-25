var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.user){
      res.redirect('/signin');
    }else{
      res.render('index');
    }
    req.on("close", function() {
      console.log("Request closed unexpectedly");
    });
    
    req.on("end", function() {
      console.log("Request end normally");
    });
});

module.exports = router;
