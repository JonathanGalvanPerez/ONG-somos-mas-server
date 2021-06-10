const express = require("express");
const organizationData = require('../services/organizationData');
const router = express.Router();

router.get("/1/public", async (req, res) => {
    try {
        const data = organizationData.get();
        res.status(200).json({
            name: data.name,
            image: data.image,
            phone: data.phone,
            address: data.address,
            welcomeText: data.welcomeText
        });
    } catch (e) {
        console.error(e.message);
        res.status(404).send({ Error: e.message });
    }
});

module.exports = router;