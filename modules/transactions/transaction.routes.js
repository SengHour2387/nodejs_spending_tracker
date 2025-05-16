const transactionRoute = require('express').Router();
const create = require("./controllers/create");
const auth = require("../../middleware/auth");
const allTransactions = require("./controllers/allTransactions");

transactionRoute.use(auth);
transactionRoute.post("/create", create);
transactionRoute.get("/", allTransactions);


module.exports = transactionRoute;