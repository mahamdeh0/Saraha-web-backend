const nodemailer = require("nodemailer");

const sendemail = async (dest, subject, message) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Emailsend,
                pass: process.env.passwordEmail,
            },
        });

        let info = await transporter.sendMail({
            from: `"saraha" <${process.env.Emailsend}>`,
            to: dest,
            subject: subject,
            html: message,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = { sendemail };
