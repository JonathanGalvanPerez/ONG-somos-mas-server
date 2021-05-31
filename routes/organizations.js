const fs = require('fs');
const path = require('path');
const express = require("express");
const router = express.Router();

const organizationdDataPath = path.join(__dirname, '../public/json/organization_data.json');

router.get("/public", async (req, res) => {
    try {
        const data = fs.readFileSync(organizationdDataPath, 'utf8');
        const parsedData = JSON.parse(data);
        res.status(200).json({
            name: parsedData.name,
            image: path.join(__dirname, parsedData.image),
            phone: parsedData.phone,
            address: parsedData.address,
            welcomeText: parsedData.welcomeText
        });
    } catch (e) {
        console.error(e.message);
        res.status(404).send({ Error: e.message });
    }
});

module.exports = router;