const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const compile = require('string-template/compile');
const organizationData = require('../services/organizationData');

// Crear SMTP transporter con credenciales
let senderEmail = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    //secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

// Conseguir nombre de organizacion
const organizationName = organizationData.get().name;

// Leer y compilar plantillas
const contactHtml = fs.readFileSync(path.join(__dirname, '../emails/contact.html'), 'utf8');
const contactTemplate = compile(contactHtml);
// repetir por cada plantilla

// Completar plantilla con los datos del usuario y la organizacion
const contactEmail = (req, _, next) => {
    const url = path.join(req.protocol, req.get('host'));
    req.html = contactTemplate({
        name: req.body.name,
        lastName: req.body.lastName,
        message: req.body.message,
        url: url,
        imageUrl: 'https://i.ibb.co/C6wB4Zr/LOGO-SOMOS-MAS.jpg', // path.join(url, 'public/LOGO-SOMOS-MAS.png'),
        organizationName: organizationName
    });
    next();
}

const sendEmail = async (email, subject, html) => {
    const mailOptions = {
        from: `${organizationName}<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: subject,
        html: html
    };
    await senderEmail.verify();
    console.log('Se conecto al mail!');
    const info = await senderEmail.sendMail(mailOptions);
    return;
}


module.exports = {
    contactEmail,
    sendEmail
}