const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function sendMail(req, res, next) {

    const {senderEmail, recipientEmail, subject, message}= req.body;

    const msg = {
        to: senderEmail,
        from: recipientEmail,
        subject: subject,
        text: message,
    };

    try {
       const res = await sgMail.send(msg);
       console.log(res);
    } catch (error) {
        console.error(error);

    }

    next();
}