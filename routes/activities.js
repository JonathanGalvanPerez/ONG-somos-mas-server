var express = require('express');
var router = express.Router();
const { Activities, Sequelize } = require("../models");
const authorize = require('../middlewares/authorize');
const Role = require('../models/role.module');

require("dotenv").config();


router.put('/:id', authorize(Role.Admin) , async (req, res) =>{
    try {
        let name=req.body.titulo;
        let image=req.body.contenido;
        let content=req.body.imagen;
        let id = req.params.id;

        if( !name || name.trim().length=== 0 || !image || image.trim().length===0|| !content || content.trim().length===0) throw new Error('Falto enviar información')

        let activity = await Activities.findAll({
            where:{id: id}
        });

        if(activity.length === 0) throw new Error('La Actividad ingresada no existe')


        activity = await Activities.update(req.body,{
            where : {id: id}
        });
        res.json({succes:'Se ha modificado correctamente'})

    } catch (e) {
        console.error(e.message);   
        res.status(413).send({"Error": e.message});
    }
});



module.exports = router;