const nodemailer = require('nodemailer');
const {parseHtmlToText} = require('./parseHtmlToText');

const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
});

const sendEmail = async (to, subject, html) => {
    try{
        await transporter.sendMail({
            from: `"GamesLock" <${process.env.MAILER_USER}>`,
            to: process.env.NODE_ENV === 'dev' ? process.env.MAILER_DEV_EMAIL : to,
            subject,
            text: parseHtmlToText(html),
            html
        });
    }catch(err){
        console.log(err);
    }
}

const sendEmailBcc = async (to=[], subject, html) => {
    try{
        await transporter.sendMail({
            from: `"GamesLock" <${process.env.MAILER_USER}>`,
            bcc: process.env.NODE_ENV === 'dev' ? [...to, process.env.MAILER_DEV_EMAIL] : to,
            subject,
            text: parseHtmlToText(html),
            html
        });
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    sendEmail,
    sendEmailBcc,
}