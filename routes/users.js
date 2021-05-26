var express = require('express');
var router = express.Router();
const {User} = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.delete('/:userID', async (req, res) =>{
  try {
      let userID = req.params.userID
      
      let user = await User.findAll({
          where:{id: userID}
      });
      if(user.length === 0) throw new Error('El usuario que se quiere eliminar no existe');

      await User.destroy({
          where : {id: userID}
      });
      res.json({succes:'El usuario se a Borrado correctamente'})

  } catch (e) {
      console.error(e.message);   
      res.status(413).send({"Error": e.message});
  }
  
})

module.exports = router;
