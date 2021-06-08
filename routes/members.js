const express = require("express");
const app = express();
const router = express.Router();
const { members, Sequelize } = require("../models");


router.post('/', async (req, res) =>{
    try {
        let name = req.body.name
        
        //Validación de la informacion enviada
        if( !name ||typeof name !='string'|| name.trim().length=== 0 ) throw new Error('Información enviada invalida')
        
        let post = await members.create(req.body);
        
        res.json(post)

    } catch (e) {
        console.error(e.message);   
        res.status(413).send({"Error": e.message});
    }
    
    });

module.exports = router;
