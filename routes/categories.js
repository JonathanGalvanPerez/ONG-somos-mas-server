const router = require("express").Router();
const { Category, Sequelize } = require("../models");

const authorize = require("../middlewares/authorize");
const Role = require("../models/role.module");

router.delete("/:id", authorize(Role.Admin), async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findAll({
      where: { id: categoryId },
    });

    if (!category || category.length === 0)
      res
        .status(413)
        .json({ error: "La categoría que se quiere eliminar no existe" });

    await Category.destroy({
      where: { id: categoryId },
    });
    res.json({ succes: "La categoría se ha borrado correctamente" });
  } catch (e) {
    res.status(413).send({ error: e.message });
  }
});

module.exports = router;
