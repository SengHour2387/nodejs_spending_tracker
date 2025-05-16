const mongoose = require('mongoose');
const allTransactions = async (req, res) => {
    const user_id = req.user.id;

    const transactionsModel = mongoose.model("transactions");

    const type = req.query.type;

    const transactions = await transactionsModel.find({
        user_id: user_id,
        ...req.query
    });

    if (!transactions) throw "No transactions found";

    res.status(200).json({
        status: "success",
        transactions: transactions
    })
}

module.exports = allTransactions;