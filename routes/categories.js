const  router = require('express').Router();
const {  Category, Sequelize } = require("../models");


router.get("/" , async (req, res) =>{
    try {
        const categoryNames = await Category.findAll({
    attributes: [ 'name'],
});
res.json(categoryNames)
    } catch (e) {
        res.status(413).send({"Error": e.message});
    }
})





module.exports = router;