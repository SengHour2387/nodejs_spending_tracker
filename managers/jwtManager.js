const jsonwebtoken = require('jsonwebtoken');

const jwtManagger = (user) => {
    const token = jsonwebtoken.sign(
        {
            id: user._id,
            name: user.name
        },
        process.env.token_key
    );
    return token;
}
module.exports = jwtManagger;