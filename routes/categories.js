const router = require("express").Router();
const { Category, Sequelize } = require("../models");

const authorize = require("../middlewares/authorize");
const Role = require("../models/role.module");

router.get("/", async (req, res) => {
  try {
    const categoryNames = await Category.findAll({
      attributes: ["id", "name","description"],
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

router.delete("/:id", authorize(Role.Admin), async (req, res) => {
  try {
    let categoryId = req.params.id;

    let category = await Category.findAll({
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


router.put("/:idCategority",authorize(Role.Admin) , async (req, res) =>{
  try {
      let name=req.body.name;
      let description=req.body.description;
      let id = req.params.idCategority
      
      //Validate
      if( !name || name.trim().length=== 0 || !description || description.trim().length===0) throw new Error('Falto enviar información')

      
      let categority = await Categories.findAll({
          where:{id: id}
      });
      console.log(categority);
      if(categority.length === 0) throw new Error('La Categoria seleccionada no existe')

      categority = await Categories.update(req.body,{
          where : {id: id}
      });
      res.json({succes:'Se ha modificado correctamente'})

  } catch (e) {
      console.error(e.message);   
      res.status(413).send({"Error": e.message});
  }

})
module.exports = router;
