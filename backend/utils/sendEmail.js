const nodemailer = require('nodemailer');
const {parseHtmlToText} = require('./parseHtmlToText');

export const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: process.env.MAILER_SECURE,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    });

    const info = await transporter.sendMail({
        from: `"GamesLock" <${process.env.MAILER_USER}>`,
        to: process.env.NODE_ENV === 'dev' ? process.env.MAILER_DEV_EMAIL : to,
        subject: subject,
        text: parseHtmlToText(html),
        html: html
    });
    console.log("Message sent: %s", info.messageId); // TODO: remove this line
}