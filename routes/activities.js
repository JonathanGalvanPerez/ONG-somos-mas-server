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
        res.status(500).send({ error: error.message });
    }
    });
    
router.get('/', async (req, res) => {
    try {
        const result = await Activity.findAll();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }
    });

router.put('/:id', authorize(Role.Admin) , async (req, res) =>{
    try {
        let name=req.body.name;
        let image=req.body.image;
        let content=req.body.content;
        let id = req.params.id;

        if( !name || name.trim().length=== 0 || !image || image.trim().length===0|| !content || content.trim().length===0)
            res.status(400).send({ error: 'Falto enviar información' });

        let activity = await Activity.findAll({
            where:{id: id}
        });

        if(activity.length === 0)
            res.status(404).send({ error: 'La Actividad ingresada no existe' });

        activity = await Activity.update(req.body,{
            where : {id: id}
        });
        res.json({ success:'Se ha modificado correctamente' })


    } catch (error) {
        console.log(error);
        console.error(e.message);   
        res.status(500).send({ error: e.message});
    }

})


router.post('/', authorize(Role.Admin), async (req, res) =>{
    try {
        let name = req.body.name
        let content = req.body.content

        

        if( !name || name.trim().length=== 0 || !content || content.trim().length===0)
            res.status(400).send('Falto enviar información');

        let post = await Activity.create(req.body);
        
        res.json(post)

    } catch (e) {
        console.error(e.message);   
        res.status(500).send({ error: e.message});
    }
});

router.delete("/:id", authorize(Role.Admin), async (req, res) => {
    try {
        let activityId = req.params.id;
    
        let activity = await Activity.findAll({
        where: { id: activityId },
        });
    
        if (!activity || activity.length === 0)
        res.status(400).send({ error: "La actividad que se quiere eliminar no existe" });
    
        await Activity.destroy({
        where: { id: activityId },
        });
        res.json({ success: "La actividad se ha borrado correctamente" });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}); 





module.exports = router;