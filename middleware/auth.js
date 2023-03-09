'use strict';

const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined

    if (!token) {
        return res.status(403).send('A token is required for authentication')
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decoded
    } catch {
        return res.status(401).send('Token is expired or invalid token!')
    }

    return next()
}

module.exports = verifyToken