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
    <div style="text-align: center;">
        <div style="text-align: center;margin: auto;padding: 50px 30px; width: 80%; max-width:500px; background-color:rgb(65, 44, 54, 0.1); border-radius: 10px;">
            <h2 style="text-align: center; font-family: 'Trebuchet MS', sans-serif;font-size: xx-large; color: #21161bD; font-weight: 600; letter-spacing: 3px;">
                Hello!
            </h2>
            <h3 style="text-align: center; font-family: 'Trebuchet MS', sans-serif;font-size: x-large; color: #674555; font-weight: 500; margin-top: 30px ">
                Your One Time Password is
            </h3>
            <h2 style="text-align: center; font-family: 'Trebuchet MS', sans-serif;font-size: xxx-large; background-color: #412c36; color: #fff; font-weight: 900; letter-spacing: 7px; margin: 60px auto 0 auto; width:fit-content; padding: 20px; border-radius:7px;">
                ${otp}
            </h2>
            <p style="text-align: center; font-family: 'Trebuchet MS', sans-serif; font-size: medium; color: #8d5f75; margin-top: 60px;">
                OTP is valid for next 30 minutes.
            </p>
            <p style="text-align: center; font-family: 'Trebuchet MS', sans-serif; font-size: medium; color: #8d5f75;">
                Please do not share the OTP or login credentials with anyone.
            </p>
            <p style="text-align: center; font-family: 'Trebuchet MS', sans-serif; font-size: large; color: #412c36; margin-top: 30px;">
                Credenager
            </p>
        </div>
    </div
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
