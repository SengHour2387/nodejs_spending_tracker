const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const forgotpw = async (req, res) => {

    const users_model = mongoose.model('users');
    const { email } = req.body;

    const existingEmail = await users_model.findOne({
        email: email
    });

    if (!existingEmail) throw "This email does not exist";

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "bb0a75e935193b",
            pass: "2a5024314674ff"
        }
    });

    const resetCode = Math.floor(100000 + Math.random() * 900000);

    existingEmail.resetCode = resetCode;
    await existingEmail.save();

    await transport.sendMail({
        to: email,
        from: "authorizer@spendtk.com",
        subject: "Welcome to Spending Info",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Page</title>
    <style>
        .page_title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
        }
        .message {
            font-size: 18px;
            text-align: center;
            margin-top: 10px;
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
    </style>
</head>
<body>
    <p class="page_title">Reset Your Password</p>
    <p class="message">Your reset code is <b> ${resetCode} </b></p>
</body>
</html>`,
        text: `your verification code is ${resetCode}`,
    })

    res.status(200).json({
        status: "success",
        message: "Verification code sent to your email",
    })
}

module.exports = forgotpw;