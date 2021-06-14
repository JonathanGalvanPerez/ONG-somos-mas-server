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

module.exports = router;
