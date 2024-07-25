const jwt = require("jsonwebtoken");
const HttpError = require("../errors/HttpError");
const { secret } = require("../config/config");



const authToken = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if (token == null) {
        throw new HttpError(401, "No token provided");
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            throw new HttpError(401, "Invalid token");
        }
        req.user = user
        next()
    })

}


module.exports = {authToken}