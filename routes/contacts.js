var express = require('express');
const authorize = require('../middlewares/authorize');
var router = express.Router();
const Role = require('../models/role.module');
const { Sequelize, Contacts } = require('../models'); 
Sequelize.Op;

/* GET Contacts. Role Administrator required */
router.get('/', authorize(Role.Admin), async (req, res) => {
    try {
        res.status(200).json(await Contacts.findAll());
    } catch (e) {
        console.error(e.message);
        res.status(413).send({ Error: e.message });
    }
});

module.exports = router;
