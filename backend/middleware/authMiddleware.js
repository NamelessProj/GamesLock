const jwt = require("jsonwebtoken");
const asyncHandler  = require("express-async-handler");
const User = require("../models/userModel");
const JWT_NAME = require('../JWT_NAME');

const protect = (authorizedRoles=[], getPassword=false) => {
    return asyncHandler(async (req, res, next) => {
        const token = req.cookies[JWT_NAME];

        if(token){
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = getPassword ? await User.findById(decoded.userId).select('+password') : await User.findById(decoded.userId);
                if(authorizedRoles.length > 0 && !authorizedRoles.includes(req.user.role)){
                    res.status(401).json({message: "Not authorized."});
                    throw new Error("Not authorized.");
                }
                next();
            }catch(error){
                console.log(error);
                res.status(401).json({message: "Not authorized, token error."});
                throw new Error("Not authorized, token error.");
            }
        }else{
            res.status(401).json({message: "Not authorized, no token."});
            throw new Error("Not authorized, no token.");
        }
    });
}

module.exports = {protect}