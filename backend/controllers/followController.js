const asyncHandler = require("express-async-handler");
const Follow = require("../models/followModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// @desc Getting all follow of a user using his id
// @route GET /api/follow/:_id
// @access Private
const getAllFollowOfAUser = asyncHandler(async (req, res) => {
    const follows = await Follow.find({user: req.params._id}).populate('follow');
    if(!follows){
        res.status(404)
        throw new Error('Follow not found');
    }else{
        res.status(200).json({follows});
    }
});

// @desc Getting all users who follow an account with his id
// @route GET /api/follow/user/:_id
// @access Private
const getAllUserWhoFollow = asyncHandler(async (req, res) => {
    const follows = await Follow.find({follow: req.params._id}).populate('user');
    if(!follows){
        res.status(404)
        throw new Error('Follow not found');
    }else{
        res.status(200).json({follows});
    }
});

// @desc Adding a follow relationship between two accounts
// @route POST /api/follow/:_id
// @access Private
const addFollow = asyncHandler(async (req, res) => {
    const user = req.user;
    const userId = user._id;
    const followId = req.params._id;

    // Getting the account of the user and the follow
    const userAccount = await User.findById(followId);
    const followAccount = await Follow.findOne({follow: followId, user: userId});

    // Check if the user try to follow himself
    const followObjectId = new mongoose.Types.ObjectId(followId);
    if(followObjectId.equals(userId)){
        res.status(400);
        throw new Error(`You cannot follow yourself.`);
    }

    // Check if both account exist and we create the follow relationship
    if(userAccount && !followAccount){
        const follow = await Follow.create({
            user: userId,
            follow: followId,
        });
        if(follow){
            user.followedCount = user.followedCount + 1;
            userAccount.followerCount = userAccount.followerCount + 1;
            await user.save();
            await userAccount.save();
            res.status(201).json({follow});
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
    const user = req.user;
    const followId = req.params._id;

    // Getting the account of the user and the follow
    const userAccount = await User.findById(followId);
    const followAccount = await Follow.findOne({follow: followId, user: req.user._id});

    // Checking if both account exist
    if(userAccount && followAccount){
        await Follow.deleteOne({follow: followId, user: req.user._id});
        user.followedCount = user.followedCount <= 0 ? 0 : user.followedCount - 1;
        userAccount.followerCount = userAccount.followerCount <= 0 ? 0 : userAccount.followerCount - 1;
        await user.save();
        await userAccount.save();
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
    getAllFollowOfAUser,
    getAllUserWhoFollow,
    addFollow,
    deletingFollow
}