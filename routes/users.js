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
  });
}

//OT34-33...fin

// solamente para prueba ------------------------------------------
/* 
const Sequelize = require("sequelize");
const userModel = require("../models/user");

const connection = {
  username: "root",
  password: "",
  database: "blog_ong",
  host: "localhost",
  dialect: "mysql",
};

const sequelize = new Sequelize(connection);
const User = userModel(sequelize, Sequelize);
 */
// const createUser = async () => {
//   sequelize.sync({ force: false })
//   const allUsers = await User.findAll()
//   const hashPassword = bcrypt.hashSync('12345', 10)
//   if (allUsers.length === 0) {
//     User.create({
//       firstName: 'Pedro', lastName: 'Suarez',
//       email: 'pedro@pedro.com', password: hashPassword
//     });
//   }
// }
// createUser()

/* GET users listing. */
router.get("/", validateToken, async (req, res, next) => {
  try {
    res.status(200).json(await User.findAll());
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
      if (equals) {
        //OT34-33...inicio
        delete user.dataValues.password;
        tokenGeneration(user, res);
        // res.status(200).json(user)
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
