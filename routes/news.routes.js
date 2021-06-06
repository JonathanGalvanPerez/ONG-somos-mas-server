const router = require("express").Router();
const {getAllNews, createNew, getNew, deleteNew, updateNew} = require('../controllers/news.controller')

router.get("/", getAllNews);
router.post("/", createNew);

router.get("/:id", getNew);
router.delete("/:id", deleteNew);
router.put('/:id', updateNew);

module.exports = router;