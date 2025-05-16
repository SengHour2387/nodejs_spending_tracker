const mongoose = require("mongoose");

const dashboard = async (req, res) => {

    const user = req.user;
    if (!user) throw "Reqest was not authenticated";
    const userModel = mongoose.model("users");
    var selectedUser = await userModel.findById(user.id);
    selectedUser.password = undefined; // remove password from the response
    if (!selectedUser) throw "User not found";

    res.status(200).json({
        status: "success",
        message: "Welcome to the dashboard",
        data:
            selectedUser

    });
}

module.exports = dashboard;