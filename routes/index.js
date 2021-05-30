var express = require('express');
const sendMail = require('../middlewares/sendMail');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test route for send email
router.post('/test', sendMail,(req, res)=>{
    res.send('nodemailer')
})
module.exports = router;
