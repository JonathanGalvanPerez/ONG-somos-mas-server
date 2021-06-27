const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { User, Sequelize } = require("../models");
const authorize = require("../middlewares/authorize");
const Role = require("../models/role.module");
const Op = Sequelize.Op;
const secretJwt = process.env.TOKEN_SECRET;

//OT34-33...inicio

app.use(express.json());

function tokenGeneration(user, res) {
  const token = jwt.sign(
    {
      userId: user.id,
      roleId: user.roleId,
    },
    secretJwt,
    {
      expiresIn: "60m",
      algorithm: "HS256",
    }
  );
  res.json({ token, roleId: user.roleId, userId: user.id });
}

//OT34-33...fin


router.delete('/:userID', async (req, res) => {
  try {
    let userID = req.params.userID
    let user = await User.findAll({
      where: { id: userID }
    });
    if (user.length === 0) throw new Error('El usuario que se quiere eliminar no existe');

    await User.destroy({
      where: { id: userID }
    });
    res.json({ succes: 'El usuario se a Borrado correctamente' })

  } catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }
})


/* GET users listing. */
router.get("/", authorize([Role.User, Role.Admin]), async (req, res, next) => {
  try {
    res.status(200).json(await User.findAll());
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

router.get("/auth/me", authorize([Role.User, Role.Admin]), async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId);
    res.status(200).json(user);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

router.post("/auth/login",
  body("email").isEmail(),
  body("password").not().isEmpty(),
  async (req, res) => {
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
  body("password").trim().isLength({ min: 5 }),
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
        return res.status(409).json({ message: "User with email already exists!" });
      }
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        firstName,
        lastName,
        password: hash,
        roleId: Role.User,
      });
      tokenGeneration(user, res);
    } catch (e) {
      console.error(e.message);
      res.status(409).send({ Error: e.message });
    }
  }
);

router.put('/:id', body("email").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, firstName, lastName } = req.body;
    const password = req.body.password || null
    const id = req.params.id;

    if (!firstName || firstName.trim().length === 0 ||
      !email || email.trim().length === 0 ||
      !lastName || lastName.trim().length === 0)
      throw new Error('Falto enviar información')

    let user = await User.findAll({
      where: { id: id }
    });

    if (user.length === 0) throw new Error('El usuario seleccionado no existe')

    console.log(user[0].id)

    user = await User.findAll({
      where: { email: email }
    });

    if (user.length > 0) {
      let result
      for (i = 0; i < user.length; i++) {
        result = user[i].id == id
        console.log({ result }, user[i].id, { id })

        if (!result) {
          throw new Error('Ya existe un usuario con ese email')
        }
      }
    }

    if (password != 'undefined' && password != null) {

      const hash = await bcrypt.hash(password, 10);
      user = await User.update({
        email,
        firstName,
        lastName,
        password: hash,
      }, {
        where: { id: id }
      });
      res.json({ succes: 'Se ha modificado correctamente' })
    }
    else {
      user = await User.update({
        email,
        firstName,
        lastName
      }, {
        where: { id: id }
      });
      res.json({ succes: 'Se ha modificado correctamente' })
    }

  } catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }

})

module.exports = router;
