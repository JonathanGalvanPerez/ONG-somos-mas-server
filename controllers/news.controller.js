const newsCtrl = {};
const { Entry, Sequelize } = require("../models");

newsCtrl.getAllNews = async (req, res) => {
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

}
newsCtrl.createNew = async (req, res) => {
    const { name, image, content, type } = req.body;
    try {

      if( !name || name.trim().length=== 0 || !content || content.trim().length===0||!image ||image.trim().length===0) throw new Error('Falto enviar información')
      
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
      console.log(error);
      res.status(500).json({
        message: 'Something goes wrong',
        data: {}
      });
    }
}

newsCtrl.getNew = async (req, res) => {
    try {
        const news = await Entry.findOne({ where: { id: req.params.id } });
        res.json(news);
        
      } catch (error) {
        console.log(error);
        res.status(404).json(error);
      }
}

newsCtrl.deleteNew = async (req, res) => {
    const { id } = req.params;
  try {

    const news = await Entry.findAll({ where: { id: id } });
      
    if(news.length === 0)  throw new Error('The novelty entered does not exist')

    await Entry.destroy({
      where: { id },
    });
    
    res.status(200).send('Correct elimination');

  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
}

newsCtrl.updateNew = async (req, res) => {
    
    try {

      const { name,image,content } = req.body;
      const { id } = req.params;

      if( !name || name.trim().length=== 0 || !content || content.trim().length===0||!image ||image.trim().length===0) throw new Error('I need to send information')

       const news = await Entry.findAll({ where: { id: id } });
      
      if(news.length === 0)  throw new Error('The novelty entered does not exist') 

      
      news = await Entry.update(req.body,{
      where : {id: id}
      });

      res.json({succes:'Se ha modificado correctamente'})
    
      
    } catch (e) {
      console.log(e);
      res.status(413).send({"Error": e.message});
    }
    
   
}


module.exports = newsCtrl;