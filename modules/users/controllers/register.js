const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtManagger = require('../../../managers/jwtManager');
const nodemailer = require('nodemailer');

const register = async (req, res) => {

    const users_model = mongoose.model('users');
    const { name, email, password, re_password, balance } = req.body;

    const existingExmail = await users_model.findOne({
        email: email
    })

    if (existingExmail) throw "This email already exists";

    if (password !== re_password) throw "Password and re_password do not match";

    if (password.length < 8) throw "Password must be at least 8 characters long";

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = await users_model.create({
        name: name,
        email: email,
        password: hashedPassword,
        balance: balance
    });

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "bb0a75e935193b",
            pass: "2a5024314674ff"
        }
    });
    // var transport = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: process.env.app_email,
    //         pass: process.env.app_pass
    //     }
    // });

    await transport.sendMail({
        to: "dalinsen9988@icloud.com",
        from: "authorizer@spendtk.com",
        subject: "You just signed up",
        text: `welcome,${name} to spending tracker pro!`,
    })

    const token = jwtManagger(newUser);

    res.status(200).json({
        status: "success",
        token: token
    })
}
module.exports = register;