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
    const { id } = req.params
    const { name, content, image } = req.body;
    
    const allTestimonials = await testimonials.findAll({
        attributes: ['name', 'content', 'image'],
        where: {
            id
        }
    });
    if (allTestimonials.length > 0){
        allTestimonials.forEach(async testimony => {
            await testimony.update({
                name,
                content,
                image
            })
        });
    } else {
        return res.status(404).json({message: "Not found"})
    }

}
