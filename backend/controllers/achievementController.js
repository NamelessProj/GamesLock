const asyncHandler = require("express-async-handler");
const Achievement = require('../models/achievementModel');

// @desc Add an achievement
// @route POST /api/achievement/
// @access Private (admin)
const createAchievement = asyncHandler(async (req, res) => {
    // Getting from fields
    const { name, description, image } = req.body;

    // Check if all the required fields are filled
    if(!name || !description || !image || name === '' || description === '' || image === '') {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if the achievement already exist
    const achievementExist = await Achievement.findOne({ name });
    if(achievementExist){
        res.status(400);
        throw new Error("This achievement is already existing.");
    }

    // Creation of the new achievement
    const achievement = await Achievement.create({
        name,
        description,
        image
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
// @access Private (admin)
const updateAchievement = asyncHandler(async (req, res) => {
    // Checking if the achievement exist, if no we send an error
    const achievement = await Achievement.findById(req.params._id);
    if(!achievement){
        res.status(400);
        throw new Error("Achievement doesn't exists.");
    }

    if(req.body.name && await Achievement.findOne({name: req.body.name})){
        res.status(400);
        throw new Error("This name is already taken by another achievement.");
    }

    // Setting the new value or keeping the previous one
    achievement.name = req.body.name || achievement.name;
    achievement.description = req.body.description || achievement.description;
    achievement.image = req.body.image || achievement.image;

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