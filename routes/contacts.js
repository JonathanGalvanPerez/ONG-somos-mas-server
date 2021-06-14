var express = require('express');
const authorize = require('../middlewares/authorize');
var router = express.Router();
const Role = require('../models/role.module');
const controller = require('../controllers/contacts.controller');
const { body, validationResult } = require('express-validator');
const { contactEmail } = require('../services/sendEmail');

/* GET Contacts. Role Administrator required */
router.get('/', authorize(Role.Admin), controller.getAllContacts);

/* POST Contacts. */
router.post(
  '/',
  body('email').isEmail().withMessage('Campo email inválido'),
  body('name').notEmpty().withMessage('Campo name inválido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    else next();
  },
  contactEmail,
  controller.createContact
);

module.exports = router;
