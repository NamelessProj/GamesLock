const asyncHandler = require("express-async-handler");
const Achievement = require('../models/achievementModel');

// @desc Add an achievement
// @route POST /api/achievement/
// @access Private
const createAchievement = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(!name || !description || name === '' || description === ''){
        res.status(400);
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

// @desc Update an achievement from the DB using his id
// @route PUT /api/achievement/:_id
// @access Private
const updateAchievement = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params._id);

    if(!achievement){
        res.status(400);
        throw new Error("Achievement doesn't exists.");
    }

    achievement.name = req.body.name || achievement.name;
    achievement.description = req.body.description || achievement.description;

    const updatedAchievement = await achievement.save();

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