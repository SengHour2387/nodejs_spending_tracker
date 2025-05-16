const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const forgotpw = require("./controllers/forgotPassword");
const resetpw = require("./controllers/resetPassword");
const dashboard = require("./controllers/dashboard");
const auth = require("../../middleware/auth");
const userRoute = express.Router();

userRoute.post("/signup", register);
userRoute.post("/login", login);
userRoute.post("/forgotpw", forgotpw);
userRoute.post("/resetpw", resetpw);
userRoute.use(auth);

userRoute.get("/dashboard", dashboard)

module.exports = userRoute;