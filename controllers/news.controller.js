const newsCtrl = {};
const { Entry, Sequelize } = require("../models");

newsCtrl.getAllNews = async (req, res) => {
    try {
        //Se realiza consulta a la tabla correspondiente
        let news = await Entry.findAll({
          where: { type: "news" },
        });
        if (news.length === 0)
          res.status(404).send({ error: "No existe ningún news" });
        else
          res.json(news);
      } catch (error) {
        console.error(error);
    
        res.status(500).send({ error: error.message});
      }

}
newsCtrl.createNew = async (req, res) => {
    const { name, image, content, categoryId } = req.body;
    try {

      if( !name || name.trim().length=== 0 || !content ||!image ||image.trim().length===0) throw new Error('Falto enviar información')
      
      let newsCreated = await Entry.create({
        name,
        image,
        content,
        categoryId,
        type: 'news'
      });
  
      if (newsCreated)
        return res.status(201).json(newsCreated);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Something goes wrong' });
    }
}

newsCtrl.getNew = async (req, res) => {
    try {
      const news = await Entry.findOne({
        where: { id: req.params.id },
        include: {
          association: 'category',
          attributes: ['name']
        }
      });
      if(news === null)
        res.status(404).send({ error: 'The novelty entered does not exist'});
      else
        res.json(news);
        
    } catch (error) {
      console.error(error.message);
      res.status(404).json(error.message);
    }
}

newsCtrl.deleteNew = async (req, res) => {
    const { id } = req.params;
  try {

    const result = await Entry.destroy({
      where: { id },
    });
    if(result === 0)
      res.status(404).send({ error: 'The novelty entered does not exist' })
    else
      res.status(200).send({ success: 'Correct elimination' });

  } catch (error) {
    console.error(error.message)
    res.status(500).send({ error: error.message });
  }
}

newsCtrl.updateNew = async (req, res) => {
    
    try {

      const { name,image,content } = req.body;
      const { id } = req.params;

      if( !name || name.trim().length=== 0 || !content || content.trim().length===0||!image ||image.trim().length===0)
        res.status(400).send({ error: 'I need to send information' });
      
      const result = await Entry.update(req.body, {
      where : {id: id}
      });
      if(result[0] === 0)
        res.status(404).send({ error: 'The novelty entered does not exist'});

      res.json({ success:'It has been modified correctly' });
    
      
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message});
    }
    
   
}


module.exports = newsCtrl;