require("express-async-errors");
const e = require("express");
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require("./handlers/errorHandler")
const cors = require("cors");
const userRoute = require("./modules/users/users.routes")
const transactionRoute = require("./modules/transactions/transaction.routes")

const app = express();
app.use(cors());

require('dotenv').config();
mongoose.connect(process.env.mongo_db, {}).then(() => {
    console.log('MongoDB connected successfully');
})
require("./models/transactionsModel");
require("./models/usersModel");
app.use(express.json())
///========routes========///
app.get('/', (req, res) => {
    res.end('Hello World!');
});

//======Routes=======//

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute)

app.all("*", (req, res) => {
    res.status(404).json({
        statue: "fail",
        message: "Route not found"
    })
})

app.use(errorHandler);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});