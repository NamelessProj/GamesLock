const jwt = require("jsonwebtoken");
const asyncHandler  = require("express-async-handler");
const User = require("../models/userModel");

const protect = (authorizedRoles=[]) => {
    return asyncHandler(async (req, res, next) => {
        const token = req.cookies.jwt;

        if(token){
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.userId);
                if(authorizedRoles.length > 0 && !authorizedRoles.includes(req.user.role)){
                    res.status(401);
                    throw new Error("Not authorized.");
                }
                next();
            }catch(error){
                console.log(error);
                res.status(401);
                throw new Error("Not authorized, token error.");
            }
        }else{
            res.status(401);
            throw new Error("Not authorized, no token.");
        }
    });
}

module.exports = {
    protect,
}