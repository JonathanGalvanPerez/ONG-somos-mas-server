var express = require('express');
var router = express.Router();
const { Activities, Sequelize } = require("../models");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const secretJwt = process.env.TOKEN_SECRET;

require("dotenv").config();



router.put('/:id', async (req, res) =>{
    try {
        let name=req.body.titulo;
        let image=req.body.contenido;
        let content=req.body.imagen;
        let id = req.params.id


        const token =req.headers["x-access-token"];
        const decodes = jwt.verify(token, process.env.TOKEN_SECRET)
        
        if(decodes.user.roleId != 1) throw new Error('No eres un usuario administrador')

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

})


router.post('/', async (req, res) =>{
    try {
        let name = req.body.name
        let content = req.body.content

        const token =req.headers["x-access-token"];
        const decodes = jwt.verify(token, process.env.TOKEN_SECRET)
        
        if(decodes.user.roleId != 1) throw new Error('No eres un usuario administrador')

        if( !name || name.trim().length=== 0 || !content || content.trim().length===0) throw new Error('Falto enviar información')

        let post = await Activities.create(req.body);
        
        res.json(post)

    } catch (e) {
        console.error(e.message);   
        res.status(413).send({"Error": e.message});
    }
    
    });

       






module.exports = router;