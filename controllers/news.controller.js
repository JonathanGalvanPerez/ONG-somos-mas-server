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
    await Entry.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
}

newsCtrl.updateNew = async (req, res) => {
    const { name, image, content } = req.body;
    try {
      const news = await Post.findOne({ where: { id: req.params.id } });
  
      
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: 'Something goes wrong',
        data: {}
      });
    }
    
    if(news.length > 0) {
      news.forEach(async element => {
        await element.update({
          name,
          image,
          content,
        })
      });
    }
}


module.exports = newsCtrl;