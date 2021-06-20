const router = require("express").Router();
const { Categories, Sequelize } = require("../models");

const authorize = require("../middlewares/authorize");
const Role = require("../models/role.module");

router.get("/", async (req, res) => {
  try {
    const categoriesData = await Categories.findAll({
      attributes: ["id", "name", "description"],
    });
    res.json(categoriesData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", authorize(Role.Admin), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.length === 0)
      res.status(400).json({ error: "Falta enviar información" });

    if (typeof name !== "string")
      res.status(400).json({ error: "El nombre de la categoría debe ser un string" });

    await Categories.create({ name, description });
    res.json({ success: "La categoría se ha creado correctamente" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", authorize(Role.Admin), async (req, res) => {
  try {
    let categoriesId = req.params.id;

    let categories = await Categories.findAll({
      where: { id: categoriesId },
    });

    if (!categories || categories.length === 0)
      res.status(400).json({ error: "La categoría que se quiere eliminar no existe" });

    await Categories.destroy({
      where: { id: categoriesId },
    });
    res.json({ success: "La categoría se ha borrado correctamente" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});


router.put("/:idCategory", authorize(Role.Admin) , async (req, res) =>{
  try {
    let name=req.body.name;
    let id = req.params.idCategory
    
    //Validate
    if( !name || name.trim().length=== 0) {
      res.status(400).send({ error: "El nombre de la categoria no puede estar vacio"})
    }

    
    let category = await Categories.findAll({
      where:{id: id}
    });
    console.log(category);
    if(category.length === 0) {
      res.status(404).send({ error: "No se ha encontrado la categoria que intenta modificar" })
    }

    category = await Categories.update(req.body,{
      where : {id: id}
    });
    res.json({ success: "Se ha modificado correctamente" })
  } catch (e) {
    console.error(e.message);   
    res.status(500).send({ error: e.message });
  }
});
module.exports = router;
