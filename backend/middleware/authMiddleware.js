const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(e){
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
    protect,
}