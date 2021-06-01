var express = require('express');
var router = express.Router();
const { activities, Sequelize } = require("../models");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const secretJwt = process.env.TOKEN_SECRET;


router.post('/', async (req, res) =>{
    try {
        let name = req.body.name
        let content = req.body.content

        
        if( !name || name.trim().length=== 0 || !content || content.trim().length===0) throw new Error('Falto enviar información')

        let post = await activities.create(req.body);
        
        res.json(post)

    } catch (e) {
        console.error(e.message);   
        res.status(413).send({"Error": e.message});
    }
})

module.exports = router;