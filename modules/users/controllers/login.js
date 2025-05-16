const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtManagger = require('../../../managers/jwtManager');

const login = async (req, res) => {

    console.log("someone submitted the login form");

    console.log(req.body);

    const userModel = mongoose.model("users");
    const { email, password } = req.body;

    concriedetectedUser = await userModel.findOne(
        {
            email: email,
        }
    );

    if (!concriedetectedUser) throw "This email does not exist";

    const isPasswordValid = await bcrypt.compare(password, concriedetectedUser.password)
    if (!isPasswordValid) throw "Password is incorrect";

    const token = jwtManagger(concriedetectedUser);

    res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        token: token,
    })
}

module.exports = login;