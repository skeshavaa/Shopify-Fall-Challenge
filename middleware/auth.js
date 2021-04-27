const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('token')

    if (!token) {
        res.status(401).json({staus: "failure", msg: "No token, authorization denied"})
    }

    try {
        const decoded = jwt.verify(token, "shopifyChallenge");

        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({status: "failure", msg: "Bad token"})
    }
}

module.exports = auth;