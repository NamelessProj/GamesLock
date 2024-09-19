const asyncHandler = require("express-async-handler");
const Achievement = require('../models/achievementModel');

// @desc Add an achievement
// @route POST /api/achievement/
// @access Private
const createAchievement = asyncHandler(async (req, res) => {
    // Check if user is an admin
    if(req.user.rights !== 1){
        res.status(400);
        throw new Error("An admin account is required.");
    }

    // Getting from fields
    const { name, description } = req.body;

    // Check if all the required fields are filled
    if(!name || !description || name === '' || description === ''){
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if the achievement already exist
    const achievementExist = await Achievement.findOne({ name });
    if(achievementExist){
        res.status(400);
        throw new Error("Achievement already exists");
    }

    // Creation of the new achievement
    const achievement = await Achievement.create({
        name,
        description
    });

    // Sending the new achievement or an error
    if(achievement){
        res.status(201).json({achievement});
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to create the achievement. Please retry later.");
    }
});

// @desc Update an achievement from the DB using his id
// @route PUT /api/achievement/:_id
// @access Private
const updateAchievement = asyncHandler(async (req, res) => {
    // Check if user is an admin
    if(req.user.rights !== 1){
        res.status(400);
        throw new Error("An admin account is required.");
    }

    // Getting the achievement
    const achievement = await Achievement.findById(req.params._id);

    // If there's no achievement with this id, we send an error
    if(!achievement){
        res.status(400);
        throw new Error("Achievement doesn't exists.");
    }

    // Setting the new value or keeping the previous one
    achievement.name = req.body.name || achievement.name;
    achievement.description = req.body.description || achievement.description;

    // Saving the achievement
    const updatedAchievement = await achievement.save();

    // Sending the achievement or an error
    if(updatedAchievement){
        res.status(201).json({achievement});
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to update the achievement.");
    }
});

module.exports = {
    createAchievement,
    updateAchievement,
}