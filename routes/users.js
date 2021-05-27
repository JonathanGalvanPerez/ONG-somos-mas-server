
const {User} = require('../db');
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')

// solamente para prueba ------------------------------------------
/*
const Sequelize = require('sequelize')
const userModel = require('../models/user')
const connection = {
  "username": 'root',
  "password": '',
  "database": 'alkemy_blog',
  "host": 'localhost',
  "dialect": "mysql"
}

const sequelize = new Sequelize(connection)
const User = userModel(sequelize, Sequelize)

const createUser = async () => {
  sequelize.sync({ force: false })
  const allUsers = await User.findAll()
  const hashPassword = bcrypt.hashSync('12345', 10)
  if (allUsers.length === 0) {
    User.create({
      firstName: 'Pedro', lastName: 'Suarez',
      email: 'pedro@pedro.com', password: hashPassword
    });
  }
}
createUser()
*/

router.delete('/:userID', async (req, res) =>{
  try {
      let userID = req.params.userID
      //Colocar el model correspondiente cuando se cree el modelo permanente
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

router.post('/auth/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findOne({
        where: { email: req.body.email }
      })
      if (user) {
        const equals = await bcrypt.compare(req.body.password, user.password)
        if (equals) {
          res.status(200).json(user)
        } else {
          res.status(400).json({ ok: false })
        }

      } else {
        res.status(400).json({ ok: false })
      }
    } catch (e) {
      console.error(e.message);
      res.status(413).send({ "Error": e.message });
    }
  })


module.exports = router;
