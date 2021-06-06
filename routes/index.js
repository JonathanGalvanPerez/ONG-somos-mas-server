var express = require('express');
const { contactEmail, sendEmail, getCredentials } = require('../middlewares/sendEmail');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test route for send email
router.post('/test', contactEmail, (req, res)=>{
  sendEmail(req.body.email, 'Hola ' + req.body.name, req.html)
    .then(() => res.send('termine de enviar el mail'))
    .catch(error => {
      console.log(error);
      res.status(500).send({ error: error.message });
    });
});

module.exports = router;
