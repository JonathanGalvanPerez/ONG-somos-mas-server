var express = require('express');
var router = express.Router();
const { Activity, Sequelize } = require("../models");
const authorize = require('../middlewares/authorize');
const Role = require('../models/role.module');

require("dotenv").config();


router.get('/:id', async (req, res) => {
    try {
        const result = await Activity.findByPk(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        console.error(error.message);
        res.status(413).send({ Error: error.message });
    }
    });
    
router.get('/', async (req, res) => {
    try {
        const result = await Activity.findAll();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(413).send({ Error: error.message });
    }
    });

router.put('/:id', authorize(Role.Admin) , async (req, res) =>{
    try {
        let name=req.body.name;
        let image=req.body.image;
        let content=req.body.content;
        let id = req.params.id;

        if( !name || name.trim().length=== 0 || !image || image.trim().length===0|| !content || content.trim().length===0) throw new Error('Falto enviar información')

        let activity = await Activity.findAll({
            where:{id: id}
        });

        if(activity.length === 0) throw new Error('La Actividad ingresada no existe')

        activity = await Activity.update(req.body,{
            where : {id: id}
        });
        res.json({succes:'Se ha modificado correctamente'})


    } catch (error) {
        console.log(error);
        console.error(e.message);   
        res.status(413).send({"Error": e.message});
    }

})


router.post('/', authorize(Role.Admin), async (req, res) =>{
    try {
        let name = req.body.name
        let content = req.body.content

        

        if( !name || name.trim().length=== 0 || !content || content.trim().length===0) throw new Error('Falto enviar información')

        let post = await Activity.create(req.body);
        
        res.json(post)

    } catch (e) {
        console.error(e.message);   
        res.status(413).send({"Error": e.message});
    }
    
    });

       






module.exports = router;