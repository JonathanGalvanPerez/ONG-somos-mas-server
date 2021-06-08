const fs = require('fs');
const path = require('path');
const express = require("express");
const router = express.Router();

const {OrganizationContact, Sequelize} = require("../models/");

const organizationdDataPath = path.join(__dirname, '../public/json/organization_data.json');


router.get("/1/public", async (req, res) => {
    try {
        const orgContact = await OrganizationContact.findAll(); //OT34-79
        const data = fs.readFileSync(organizationdDataPath, 'utf8');
        const parsedData = JSON.parse(data);
        res.status(200).json({
            name: parsedData.name,
            image: parsedData.image,
            phone: parsedData.phone,
            address: parsedData.address,
            welcomeText: parsedData.welcomeText,
            orgContact
        });
    } catch (e) {
        console.error(e.message);
        res.status(404).send({ Error: e.message });
    }
});

module.exports = router;