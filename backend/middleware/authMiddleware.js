const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    // Checking if there's a token, if no we send an error
    if(token){
        try {
            // Checking if the token is valid and we send the user
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId);
            next();
        }catch(e){
            // If there's an error, we send it
            console.log(e);
            res.status(401);
            throw new Error("Not authorized, token error.");
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, no token.");
    }
});

module.exports = {
    protect
}