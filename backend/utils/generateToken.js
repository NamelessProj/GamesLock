const jwt = require('jsonwebtoken');
const JWT_NAME = require('../JWT_NAME');

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie(JWT_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV  !== 'dev',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000
    });
}

module.exports = {
    generateToken
}