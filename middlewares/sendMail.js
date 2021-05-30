const { response } = require('express');
const nodemailer = require('nodemailer');

async function sendEmail(req, res, next) {

    const senderEmail = nodemailer.createTransport({
        service: process.env.NODEMAILER_SENDER_SERVICE,
        auth: {
            user: process.env.NODEMAILER_SENDER_USER,
            pass: process.env.NODEMAILER_SENDER_PASSWORD
        }
    });


    const { emailTo, subject, message } = req.body;

    const mailOptions = {
        from: process.env.NODEMAILER_SENDER_USER,
        to: emailTo,
        subject: subject,
        text: message
    };

    try {
        await senderEmail.sendMail(mailOptions);
        next()
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

}


module.exports = sendEmail;