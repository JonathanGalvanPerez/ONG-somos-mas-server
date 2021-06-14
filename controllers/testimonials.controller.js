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

exports.updateTestimony = async (req, res) => {
    const { name, content, image } = req.body;
    try {
        const testimony = await testimonials.findOne({ where: { id: req.params.id } });
             
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Not found",
            data: {}
        })        
    }
    if(testimony.length > 0){
        testimony.forEach(async element => {
            await element.update({
                name,
                content,
                image
            })
        });
    }
}
