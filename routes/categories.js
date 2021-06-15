const router = require("express").Router();
const { Category, Sequelize } = require("../models");

const authorize = require("../middlewares/authorize");
const Role = require("../models/role.module");

router.get("/", async (req, res) => {
  try {
    const categoryNames = await Category.findAll({
      attributes: ["name"],
    });
    res.json(categoryNames);
  } catch (e) {
    res.status(413).json({ error: e.message });
  }
});

router.post("/", authorize(Role.Admin), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.length === 0)
      res.status(413).json({ error: "Falta enviar información" });

    if (typeof name !== "string")
      res
        .status(413)
        .json({ error: "El nombre de la categoría debe ser un string" });

    await Category.create({ name, description });
    res.json({ success: "La categoría se ha creado correctamente" });
  } catch (e) {
    res.status(413).json({ error: e.message });
  }
});
module.exports = router;
