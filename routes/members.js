const express = require("express");
const router = express.Router();
const { members, Sequelize } = require("../models");
const authorize = require("../middlewares/authorize");
const Role = require("../models/role.module");

router.get("/", authorize(Role.Admin), async (req, res) => {
  try {
    let member = await members.findAll();

    res.json(member);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

router.delete("/:id", authorize(Role.Admin), async (req, res) => {
  const { id } = req.params;
  try {
    const member = await members.findOne({ where: { id } });

    if (!member) {
      res.json({ Error: "The member you want to delete does not exist" });
    }
    await members.destroy({
      where: { id },
    });
    res.json({ Success: "Member deleted successfully" });
  } catch (error) {
    res.send({ Error: error.message });
  }
});

module.exports = router;
router.put("/:id", authorize(Role.Admin), async (req, res) => {
  const { id } = req.params;

  try {
    let member = await members.findOne({ where: { id } });
    if (!member)
      res.json({ Error: "The member you want to modify does not exist" });

    await members.update(req.body, {
      where: { id },
    });
    res.json({ Success: "Member updated successfully" });
  } catch (e) {
    res.status(404).send({ Error: e.message });
  }
});
