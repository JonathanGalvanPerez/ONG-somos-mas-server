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

    const { emailTo, subject, message} = req.body;

    const mailOptions = {
        from: process.env.NODEMAILER_SENDER_USER,
        to: emailTo,
        subject: subject,
        text: message
    };
    console.log(mailOptions)


    try {
        const info = await senderEmail.sendMail(mailOptions);
        res.status(200).json({ ok: info.response });
        next()

    } catch (error) { 
        console.error(error.message);
    }

}


module.exports = sendEmail;