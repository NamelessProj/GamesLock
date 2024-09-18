const asyncHandler = require("express-async-handler");
const Achievement = require('../models/achievementModel');
const User = require("../models/userModel");
const {generateToken} = require("../utils/generateToken");
const {deleteMessage} = require("./messageController");

// @desc Add an achievement
// @route POST /api/achievement/add
// @access Private
const createAchievement = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(!name || !description || name === '' || description === ''){
        res.status(401);
        throw new Error("Please fill all fields");
    }

    const achievementExist = await Achievement.findOne({ name });
    if(achievementExist){
        res.status(400);
        throw new Error("Achievement already exists");
    }

    const achievement = await Achievement.create({
        name,
        description
    });

    if(achievement){
        res.status(201).json({achievement});
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to create the achievement. Please retry later.");
    }
});

module.exports = {
    createAchievement,
}