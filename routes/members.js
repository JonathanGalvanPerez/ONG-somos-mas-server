const express = require("express");
const app = express();
const router = express.Router();
const { members, Sequelize } = require("../models");
const authorize = require("../middlewares/authorize");
const Role = require("../models/role.module");




    















router.get('/', authorize(Role.Admin), async (req, res) =>{
        try {

            let member = await members.findAll();
            
            res.json(member)
    
        } catch (e) {
            console.error(e.message);   
            res.status(413).send({"Error": e.message});
        }
        
        });




module.exports = router;
