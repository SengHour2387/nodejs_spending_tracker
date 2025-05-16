const jsonwebtoken = require('jsonwebtoken');

const auth = (req, res, next) => {

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const acceessToken = jsonwebtoken.verify(token, process.env.token_key);
        req.user = acceessToken;
    } catch (e) {
        res.status(401).json({
            status: "Error",
            message: "Invalid token"
        });
        return;
    }
    next();

}

module.exports = auth;