var express = require('express');
const sendEmail = require('../middlewares/sendEmail');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test route for send email
router.post('/test', sendEmail,(req, res)=>{
    res.send('nodemailer')
})
module.exports = router;
