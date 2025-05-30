const errorHandler = (err, req, res, next) => {
    if (err) {
        console.log(err);
        if (err.message) {
            res.status(400).json({
                status: "Error",
                message: err.message
            });
        } else {
            res.status(400).json({
                status: "Error",
                message: err
            });
        }
    } else {
        next();
    }
}
module.exports = errorHandler;