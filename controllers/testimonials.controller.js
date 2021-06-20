const { testimonials } = require("../models");

exports.getAllTestimonials = async (req, res) => {
    try {
        res.status(200).json(await testimonials.findAll());
    } catch (e) {
        console.error(e.message);
        res.status(413).send({ Error: e.message });
    }

}

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
    const { name, image, content } = req.body;
    try {
        const testimony = await testimonials.findOne({ where: { id: req.params.id } });
        await testimony.update({
            name,
            image,
            content,
        })
        res.status(200).json({ message: 'updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Something goes wrong' });
    }


}

exports.deleteTestimony = async (req, res) => {
    try {
        const { id } = req.params;
        await testimonials.destroy({ where: { id } });
        res.json({ message: "Testimony deleted succesfully" });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Testimony not found" });
    }
}
