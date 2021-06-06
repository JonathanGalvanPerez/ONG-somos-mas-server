const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { User, Sequelize } = require("../models");
const Op = Sequelize.Op;

//OT34-33...inicio

const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const validateToken = require("../middlewares/middlewares");

const secretJwt = process.env.TOKEN_SECRET;
app.use(express.json());
app.use(
  expressJwt({
    secret: secretJwt,
    algorithms: ["HS256"],
  }).unless({ path: ["/login"] })
);

function tokenGeneration(user, res) {
  const token = jwt.sign(
    {
      user,
    },
    secretJwt,
    { expiresIn: "60m" }
  );
  res.json({
    token,
    roleId
  });
}

//OT34-33...fin

// solamente para prueba ------------------------------------------

// const Sequelize = require("sequelize");
// const userModel = require("../models/user");
// const user = require("../models/user");

// const connection = {
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   dialect: "mysql",
// };

// const sequelize = new Sequelize(connection);
// const User = userModel(sequelize, Sequelize);

// const createUser = async () => {
//   try {
//     sequelize.sync({ force: false });
//     const allUsers = await User.findAll();
//     const hashPassword = bcrypt.hashSync("12345", 10);
//     if (allUsers.length === 0) {
//       User.create({
//         firstName: "Pedro",
//         lastName: "Suarez",
//         email: "pedro@pedro.com",
//         password: hashPassword,
//       });
//     }
//   } catch (error) {
//     console.log("el error  es : ", error);
//   }
// };
// createUser();


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

/* GET users listing. */
router.get("/", validateToken, async (req, res, next) => {
  try {
    res.status(200).json(await User.findAll());
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

router.get("/auth/me", validateToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    res.status(200).json(user);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

router.post("/auth/login", body("email").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    
    if (user) {
      const equals = await bcrypt.compare(req.body.password, user.password);
      console.log(equals);
      if (equals) {
        //OT34-33...inicio
        delete user.dataValues.password;
        tokenGeneration(user, res);
        //res.status(200).json(user);
        //OT34-33...fin
      } else {
        res.status(400).json({ ok: false });
      }
    } else {
      res.status(400).json({ ok: false });
    }
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});


/* POST Register route */

router.post(
  "/auth/register",
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("The name must contain at least 2 characters"),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("The lastname must contain at least 2 characters"),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password, firstName, lastName } = req.body;
      const alreadyExists = await User.findOne({ where: { email } }).catch(
        (err) => {
          console.log("Error: ", err);
        }
      );
      if (alreadyExists) {
        return res.json({ message: "User with email already exists!" });
      }
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        firstName,
        lastName,
        password: hash,
      });
      tokenGeneration(user, res);
    } catch (e) {
      console.error(e.message);
      res.status(409).send({ Error: e.message });
    }
  }
);


module.exports = router;
