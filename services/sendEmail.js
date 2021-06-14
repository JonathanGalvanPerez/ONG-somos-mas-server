const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const compile = require('string-template/compile');
const organizationData = require('./organizationData');

// Crear SMTP transporter con credenciales
let senderEmail = nodemailer.createTransport({
    host: process.env.NODEMAILER_SENDER_HOST,
    port: process.env.NODEMAILER_SENDER_PORT,
    //secure: true,
    auth: {
        user: process.env.NODEMAILER_SENDER_USER,
        pass: process.env.NODEMAILER_SENDER_PASSWORD
    }
});

// Crear transporter de mails sin credenciales
// ejecutar asincronamente antes de enviar mails
const getCredentials = async () => {
    // Obtener credenciales de prueba
    let account = await nodemailer.createTestAccount()
    console.log('Credentials obtained, sending message...');

    // Crea SMTP transporter
    senderEmail = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });
    return;
}

// Conseguir nombre de organizacion
const organizationName = organizationData.get().name;

// Leer y compilar plantillas
const contactHtml = fs.readFileSync(path.join(__dirname, '../emails/contact.html'), 'utf8');
const contactTemplate = compile(contactHtml);
// repetir por cada plantilla

// Completar plantilla con los datos del usuario y la organizacion
const contactEmail = (req, _, next) => {
    const url = path.join(req.protocol, req.get('host'));
    const { name, message, phone } = req.body;
    req.html = contactTemplate({
        name,
        message: message? message : 'Sin mensaje.',
        phone: phone? phone : 'N/A',
        url: url,
        imageUrl: 'https://i.ibb.co/C6wB4Zr/LOGO-SOMOS-MAS.jpg', // path.join(url, 'public/LOGO-SOMOS-MAS.png'),
        organizationName: organizationName
    });
    
    // Sin string-template
    /*const { name, lastName, email, subject, message } = req.body;
    const organizationName = organizationData.get().name;
    const url = path.join(req.protocol, req.get('host'));

    
    html = html.replace(/{name}/g, name);
    html = html.replace(/{lastName}/g, lastName);
    html = html.replace(/{message}/g, message);
    html = html.replace(/{url}/g, url);
    //html = html.replace(/{imageUrl}/g, path.join(url, 'public/LOGO-SOMOS-MAS.png'));
    html = html.replace(/{imageUrl}/g, 'https://i.ibb.co/C6wB4Zr/LOGO-SOMOS-MAS.jpg');
    html = html.replace(/{organizationName}/g, organizationName);*/

    next();
}


const sendEmail = async (email, subject, html) => {
    const mailOptions = {
        from: 'Recipient <recipient@example.com>',   // `${organizationName}<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: subject,
        html: html
    };
    await senderEmail.verify();
    console.log('Se conecto al mail!');
    const info = await senderEmail.sendMail(mailOptions);
    // Preview del email solo disponible con cuenta de prueba de Ethereal
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return;
}


module.exports = {
    getCredentials,
    contactEmail,
    sendEmail
}