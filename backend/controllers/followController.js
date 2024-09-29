const asyncHandler = require("express-async-handler");
const Follow = require("../models/followModel");
const User = require("../models/userModel");

// @desc Adding a follow relationship between two accounts
// @route POST /api/follow/:_id
// @access Private
const addFollow = asyncHandler(async (req, res) => {
    const followId = req.params._id;
    const userAccount = await User.findById(followId);
    const followAccount = await Follow.findOne({follow: followId, user: req.user._id});

    if(userAccount && !followAccount){
        const follow = await Follow.create({
            user: req.user._id,
            followId: followId,
        });
        if(follow){
            res.status(201).json(follow);
        }else{
            res.status(400);
            throw new Error(`An error occur while attempting to follow this account. Please retry later.`);
        }
    }else if(!userAccount){
        res.status(400);
        throw new Error(`The user doesn't exist.`);
    }else{
        res.status(400);
        throw new Error(`You are already following this account.`);
    }
});

// @desc Removing a follow relationship between two accounts
// @route DELETE /api/follow/:_id
// @access Private
const deletingFollow = asyncHandler(async (req, res) => {
    const followId = req.params._id;
    const userAccount = await User.findById(followId);
    const followAccount = await Follow.findOne({follow: followId, user: req.user._id});

    if(userAccount && followAccount){
        await Follow.deleteOne({follow: followId, user: req.user._id});
        res.status(200).json({message: `You don't follow ${userAccount.username} anymore.`});
    }else if(!userAccount){
        res.status(400);
        throw new Error(`The user doesn't exist.`);
    }else{
        res.status(400);
        throw new Error(`You don't follow this account yet.`);
    }
});

module.exports = {
    addFollow,
    deletingFollow
}