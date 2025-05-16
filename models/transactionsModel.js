const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["income", "expense"]
    }
},
    {
        timestamps: true
    }
);

const transactionsModel = mongoose.model('transactions', transactionsSchema);