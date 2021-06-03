const router = require("express").Router();

const { Entry, Sequelize } = require("../models");
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
  try {
    //Se realiza consulta a la tabla correspondiente
    let news = await Entry.findAll({
      where: { type: "news" },
    });
    if (news.length === 0) throw new Error("No existe ningún news");

    res.json(news);
  } catch (error) {
    console.error("Error");

    res.status(413).send("Error");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Entry.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
});

router.post("/news", async (req, res) => {
  const { name, image, content, type } = req.body;
  try {
    let newsCreated = await Entry.create({
      name,
      image,
      content,
      type: 'news'
    }, {
      fields: ['name', 'image', 'content', 'type']
    });

    if (newsCreated) {
      return res.json(newsCreated);
    }
  } catch (error) {
    console.error("Error");
    res.status(500).json({
      message: 'Something goes wrong',
      data: {}
    });
  }
});

module.exports = router;
