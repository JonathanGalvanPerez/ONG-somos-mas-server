var express = require('express');
var router = express.Router();

const authorize = require('../middlewares/authorize');
const Role = require('../models/role.module');
const {  Categories, Sequelize } = require("../models");

require("dotenv").config();



router.put("/:idCategority",authorize(Role.Admin) , async (req, res) =>{
    try {
        let name=req.body.name;
        let description=req.body.description;
        let id = req.params.idCategority
        
        //Validate
        if( !name || name.trim().length=== 0 || !description || description.trim().length===0) throw new Error('Falto enviar información')

        
        let categority = await Categories.findAll({
            where:{id: id}
        });
        console.log(categority);
        if(categority.length === 0) throw new Error('La Categoria seleccionada no existe')

        categority = await Categories.update(req.body,{
            where : {id: id}
        });
        res.json({succes:'Se ha modificado correctamente'})

    } catch (e) {
        console.error(e.message);   
        res.status(413).send({"Error": e.message});
    }

})




module.exports = router;