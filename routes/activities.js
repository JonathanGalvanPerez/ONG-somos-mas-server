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
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }
    });

router.put('/:id', authorize(Role.Admin) , async (req, res) =>{
    try {
        let id = req.params.id;

        let result = await Activity.update(req.body,{
            where : {id: id}
        });
        // Update retorna una lista donde el primer elemento es el numero de filas afectadas
        if(result[0]==0)
            res.status(404).send({ error: 'La Actividad ingresada no existe' });
        else
            res.status(200).send({ success:'Se ha modificado correctamente' })

    } catch (error) {
        console.error(e.message);   
        res.status(500).send({ error: e.message});
    }

})


router.post('/', authorize(Role.Admin), async (req, res) =>{
    try {
        let name = req.body.name
        let content = req.body.content

        if( !name || name.trim().length=== 0 || !content || content.trim().length===0)
            res.status(400).end('Falto enviar información');
        else {
            let post = await Activity.create(req.body);
            res.status(201).json(post)
        }

    } catch (e) {
        console.error(e.message);   
        res.status(500).send({ error: e.message});
    }
});

router.delete("/:id", authorize(Role.Admin), async (req, res) => {
    try {
        let activityId = req.params.id;
        let result = await Activity.destroy({
            where: { id: activityId },
        });
        // Destroy retorna el numero de filas eliminadas
        if(result === 0)
            res.status(400).send({ error: "La actividad que se quiere eliminar no existe" });
        else
            res.json({ success: "La actividad se ha borrado correctamente" });
    } catch (e) {
        console.error(e.message);   
        res.status(500).send({ error: e.message });
    }
}); 





module.exports = router;