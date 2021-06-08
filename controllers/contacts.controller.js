const { Sequelize, Contact } = require('../models');
Sequelize.Op;

// GET /contacts
exports.getAllContacts = async (req, res) => {
  try {
    res.status(200).json(await Contact.findAll());
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
};

// POST /contacts
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const result = await Contact.create({ name, email, phone, message });

    res.status(200).json(result);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ errors: [{ msg: e.message }] });
  }
};
