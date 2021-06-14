const { testimonials, Sequelize } = require("../models");

// POST /testimonials
exports.createTestimony = async (req, res) => {
    try {
        const { name, content, image } = req.body;

        const result = await testimonials.create({ name, content, image });

        res.status(200).json(result);
    } catch (e) {
        console.error(e.message);
        res.status(413).send({ errors: [{ msg: e.message }] });
    }
};
