const { getCredentials, sendEmail } = require('../services/sendEmail');
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

    // Crea el contacto en la base de datos

    await Contact.create({ name, email, phone, message });

    // Envio de email

    await getCredentials(); // quitar si tiene acceso a un servicio SMTP
    await sendEmail(req.body.email, 'Hola ' + req.body.name + '!', req.html);
    
    res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ errors: [{ msg: e.message }] });
  }
};
