const z = require('zod')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('bearer ')){
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded){
            req.userId = decoded.userId;
            next();
        }
    } catch (error) {
        return res.status(403).json({
            message: "auth error"
        })
    }
}

module.exports = authMiddleware;
