const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let error;
    try {
        let token = req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            error = new Error("No token provided");
            error.statusCode = 401;
            throw error;
        }
        let decoded = jwt.verify(token, 'your_jwt_secret');   
        req.user = decoded;
        
        next();

    } catch (err) {
        console.log(err);
        next(err)
    }
}

module.exports = authMiddleware;