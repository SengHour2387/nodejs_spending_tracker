const mongoose = require('mongoose');

const create = async (req, res) => {

    const transactionsModel = mongoose.model("transactions");
    const userModel = mongoose.model("users");
    const user_id = req.user.id;
    const { amount, type, description } = req.body;


    const selectedUser = await userModel.findById(user_id);

    if (!selectedUser) throw "This user does not exist";
    if (type !== "income" && type !== "expense") throw "Type must be either income or expense";
    if (amount <= 0) throw "Amount must be greater than 0";

    if (type === "expense") {
        if (selectedUser.balance < amount) {
            throw "Insufficient balance";
        } else {
            selectedUser.balance -= amount;
        }
    }
    if (type === "income") {
        selectedUser.balance += amount;
    }

    await selectedUser.save();

    await transactionsModel.create({
        user_id: user_id,
        amount: amount,
        type: type,
        description: description
    });

    res.status(200).json({
        status: "success",
        message: "Transaction created successfully",
    })

}

module.exports = create;