const router = require("express").Router();
const {getAllNews, createNew, getNew, deleteNew, updateNew} = require('../controllers/news.controller');
const authorize = require("../middlewares/authorize");
const Role = require("../models/role.module");

router.get("/", getAllNews);
router.post("/", authorize(Role.Admin), createNew);

router.get("/:id", getNew);
router.delete("/:id", authorize(Role.Admin), deleteNew);
router.put('/:id', authorize(Role.Admin), updateNew);

module.exports = router;