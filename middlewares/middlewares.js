//OT34-33...inicio

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const secretJwt = process.env.TOKEN_SECRET;

function validateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    try {
      const decoded = jwt.verify(token, secretJwt);
      next()
    } catch(err) {
      
      console.error(e.message);
      res.status(413).send({ "Error": e.message });
  
    }  
  }

  module.exports = validateToken;
  //OT34-33...fin
  