const nodemailer = require('nodemailer');
const path = require('path');
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

// Completar plantilla con los datos del usuario y la organizacion
const contactEmail = (req, _, next) => {
    const { name, lastName, email, subject, message } = req.body;
    const organizationName = organizationData.get().name;
    const url = path.join(req.protocol, req.get('host'));
    const url = path.join(req.protocol, req.get('host'));
    html = html.replace(/{name}/g, name);
    html = html.replace(/{lastName}/g, lastName);
    html = html.replace(/{message}/g, message);
    html = html.replace(/{url}/g, url);
    //html = html.replace(/{imageUrl}/g, path.join(url, 'public/LOGO-SOMOS-MAS.png'));
    html = html.replace(/{imageUrl}/g, 'https://i.ibb.co/C6wB4Zr/LOGO-SOMOS-MAS.jpg');
    html = html.replace(/{organizationName}/g, organizationName);
    req.html = html;
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