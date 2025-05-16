const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const resetpw = async (req, res) => {

    const userModel = mongoose.model('users');
    const { resetCode, password, re_password } = req.body;

    const selectedUser = await userModel.findOne(
        {
            resetCode: resetCode
        });

    if (!selectedUser) throw "This reset code does not exist";
    if (password !== re_password) throw "Password and re_password do not match";
    if (password.length < 8) throw "Password must be at least 8 characters long";

    const hashedPassword = await bcrypt.hashSync(password, 10);
    selectedUser.password = hashedPassword;
    selectedUser.resetCode = undefined;
    await selectedUser.save();

    res.status(200).json({
        status: "success",
        message: "Password reset successfully",
    })

}

module.exports = resetpw;