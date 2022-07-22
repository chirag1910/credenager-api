const nodemailer = require("nodemailer");

const send = async (mailTo, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const body = `
                <h1>
                    ${otp}
                </h1>
    `;

    const mailOptions = {
        from: "Credenager <noreply@credenager.com>",
        to: mailTo,
        subject: "Credenager OTP",
        html: body,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = send;
