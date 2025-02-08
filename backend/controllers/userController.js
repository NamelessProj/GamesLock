const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Achievement = require("../models/achievementModel");
const Notification = require("../models/notificationModel");
const Log = require('../models/logModel');
const Otp = require('../models/otpModel');
const { generateToken } = require('../utils/generateToken');
const { getIpInformation } = require('../utils/getIpInformation');
const { createLog } = require('../utils/createLog');
const { sendEmail } = require('../utils/sendEmail');
const { createOTP } = require('../utils/createOTP');
const getAverageColorOfImage = require('../utils/getAverageColorOfImage');
const {deleteProfilePicture} = require('../utils/deleteProfilePicture');
const cron = require('node-cron');
const RootPath = require('../rootPath');
const {getSeededRandomPfp} = require('../utils/getRandomPfp');
const {uploadImage} = require("../utils/uploadImage");
const JWT_NAME = require('../JWT_NAME');

// @desc Login user with a token
// @route POST /api/user/login
// @access Public
const login = asyncHandler(async (req, res) => {
    // Getting the form fields
    const {email, password} = req.body;

    // Check if the fields are filled
    if(!email || !password || email === '' || password === ''){
        res.status(401).json({message: "Please fill all fields"});
        throw new Error("Please fill all fields");
    }

    // Getting the user
    const user = await User.findOne({ email }).select('+password');

    // Check if the user exist and if the password is correct
    if(user && await user.matchPassword(password)){
        // Fetching IP info only if it's not a private IP address
        const result = await getIpInformation(req);

        // Creation of the login log
        await createLog(result, user);

        // Removing the password from the user's information
        const returnUser = Object.fromEntries(Object.entries(user._doc).filter(([key]) => key !== 'password'));

        // Generate a token for the user and sending the user's information
        generateToken(res, user._id);
        res.status(201).json({user: returnUser});
    }else{
        // Sending an error
        res.status(401).json({message: "A problem occur with your password or email."});
        throw new Error("A problem occur with your password or email.");
    }
});

// @desc Register a user into the DB
// @route POST /api/user/register
// @access Public
const register = asyncHandler(async (req, res) => {
    // Getting the form fields
    const {username, email, password, otp} = req.body;

    // Check if the fields are filled
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        res.status(400).json({message: "Please fill all the required fields"});
        throw new Error("Please fill all the required fields");
    }

    // Check if the OTP is filled
    if(!otp || otp === ''){
        res.status(400).json({message: "Please fill the OTP field."});
        throw new Error("Please fill the OTP field.");
    }

    // Checking if a user with this email exist, if yes sending an error
    const emailExists = await User.findOne({email});
    if(emailExists){
        res.status(400).json({message: "This email is already in use."});
        throw new Error("This email is already in use.");
    }

    // Checking if a user with this username exist, if yes sending an error
    const usernameExists = await User.findOne({username});
    if(usernameExists){
        res.status(400).json({message: "This username is already taken."});
        throw new Error("This username is already taken.");
    }

    // Checks if the username is not too long or too short
    if(username.length < 3){
        res.status(400).json({message: "The username must be at least 3 characters."});
        throw new Error("The username must be at least 3 characters.");
    }
    if(username.length > 20){
        res.status(400).json({message: "The username must be under 20 characters."});
        throw new Error("The username must be under 20 characters.");
    }

    // Checking if the OTP is correct and is less than 2 minutes old
    const twoMinutesAgo = new Date(Date.now() - 2 * 60000);
    const otpExists = await Otp.findOne({
        email,
        otp,
        type: 'register',
        createdAt: {$gte: twoMinutesAgo}
    });
    if(!otpExists){
        res.status(400).json({message: "The OTP is incorrect."});
        throw new Error("The OTP is incorrect.");
    }

    const profileImage = getSeededRandomPfp(username);

    // Getting the average color of the user profile picture
    const profileColor = {
        hex: '#FF5722',
        rgb: 'rgb(255, 87, 34)',
        isDark: false
    }
    const color = await getAverageColorOfImage(`${RootPath}/uploads/user/${profileImage}`);
    profileColor.hex = color.hex;
    profileColor.rgb = color.rgb;
    profileColor.isDark = color.isDark;

    // Creating the new user
    const user = await User.create({
        username,
        email,
        password,
        profileImage,
        profileColor
    });

    // Sending the user's information or an error
    if(user){
        generateToken(res, user._id);

        // Fetching IP info only if it's not a private IP address
        const result = await getIpInformation(req);

        // Creation of the register log
        await createLog(result, user);

        // Removing the password from the user's information
        const returnUser = Object.fromEntries(Object.entries(user._doc).filter(([key]) => key !== 'password'));

        res.status(201).json({user: returnUser});

        // Sending an email to the user to confirm his registration
        await sendEmail(returnUser.email, "Welcome to GamesLock", `<p>Welcome <b>${returnUser.username}</b> to GamesLock.</p><p>We're happy to see a new face.</p>`);

        // Deleting the OTP
        await Otp.findOneAndDelete().where({email, otp, type: 'register'});
    }else{
        res.status(400).json({message: "An error occur while attempting to create the user. Please retry later."});
        throw new Error("An error occur while attempting to create the user. Please retry later.");
    }
});

// @desc Generate an OTP for the user to check his email before registering
// @route POST /api/user/otp
// @access Public
const generateOtp = asyncHandler(async (req, res) => {
    const {email, username} = req.body;

    if(!email || email === '' || !username || username === ''){
        res.status(400).json({message: "Please fill all the field."});
        throw new Error("Please fill all the field.");
    }

    // Checking if a user with this email exist, if yes sending an error
    const emailExists = await User.findOne({email});
    if(emailExists){
        res.status(400).json({message: "This email is already in use."});
        throw new Error("This email is already in use.");
    }

    // Checking if a user with this username exist, if yes sending an error
    const usernameExists = await User.findOne({username});
    if(usernameExists){
        res.status(400).json({message: "This username is already taken."});
        throw new Error("This username is already taken.");
    }

    // Checks if the username is not too long or too short
    if(username.length < 3){
        res.status(400).json({message: "The username must be at least 3 characters."});
        throw new Error("The username must be at least 3 characters.");
    }
    if(username.length > 20){
        res.status(400).json({message: "The username must be under 20 characters."});
        throw new Error("The username must be under 20 characters.");
    }

    const otp = createOTP(); // Generate a random 6 digits number
    res.status(201).json({'message': `An OTP has been sent.`});
    await sendEmail(email, "Your OTP code", `<p>Your OTP is: <br/><br/><b>${otp}</b></p>`);
    await Otp.findOneAndDelete().where({email, type: 'register'}); // Deleting the old OTP if it exists
    await Otp.create({email, otp}); // Creating the new OTP
});

// @desc Update a user from the DB using his id
// @route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;

    // Updating the user's information with the new one or the old one
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.description = req.body.description || user.description;

    // Checking if another user exist with this email, if yes sending an error
    const emailExists = await User.findOne({
        email: user.email,
        _id: {$ne: user._id}
    });
    if(emailExists){
        res.status(400).json({message: "This email is already in use."});
        throw new Error("This email is already in use.");
    }

    // Checking if another user exist with this username, if yes sending an error
    const usernameExists = await User.findOne({
        username: user.username,
        _id: {$ne: user._id}
    });
    if(usernameExists){
        res.status(400).json({message: "This username is already taken."});
        throw new Error("This username is already taken.");
    }

    const {mimetype} = req.file ? req.file : {mimetype: ''};

    const AUTHORIZED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

    const imgValid = !!(mimetype && AUTHORIZED_MIME_TYPES.includes(mimetype.toLowerCase()));

    let filename = '';
    if(req.file) filename = await uploadImage(req.file, {folder: 'user', fit: 'cover', width: 120, height: 120});

    const imagePath = imgValid ? filename : '';

    // Deleting the downloaded file if it's not an image
    if(req.file && filename && !imgValid) await deleteProfilePicture(filename);

    if(imagePath !== ''){
        // Deleting the old image
        if(user.profileImage !== '') await deleteProfilePicture(user.profileImage);

        // Adding the new image
        user.profileImage = imagePath;

        // Getting the average color of the image
        const color = await getAverageColorOfImage(`${RootPath}/uploads/user/${filename}`);
        user.profileColor.hex = color.hex;
        user.profileColor.rgb = color.rgb;
        user.profileColor.isDark = color.isDark;
    }

    // Checking if the username is not too small or too big
    if(user.username.length < 3 || user.username.length > 20){
        res.status(400).json({message: "The username must be at least 3 characters and under 20 characters."});
        throw new Error("The username must be at least 3 characters and under 20 characters.");
    }

    // Updating the user
    const updatedUser = await user.save();

    // Sending the user's information or an error
    if(updatedUser){
        res.status(201).json({user: updatedUser});
    }else{
        res.status(400).json({message: "An error occur while modifying the profile. Please retry later."});
        throw new Error("An error occur while modifying the profile. Please retry later.");
    }
});

// @desc Update a user notification settings from the DB using his id
// @route PUT /api/user/profile/notification
// @access Private
const updateUserNotification = asyncHandler(async (req, res) => {
    const user = req.user;

    const like = req.body.like ?? user.notification.like;
    const comment = req.body.comment ?? user.notification.comment;
    const follow = req.body.follow ?? user.notification.follow;
    const newMessage = req.body.newMessage ?? user.notification.newMessage;

    // Updating the user's notification settings
    user.notification.like = like;
    user.notification.comment = comment;
    user.notification.follow = follow;
    user.notification.newMessage = newMessage;

    // Updating the user
    await user.save();

    res.status(201).json({user});
});

// @desc Update a user's password from the DB using his id
// @route PUT /api/user/profile/password
// @access Private
const updateUserPassword = asyncHandler(async (req, res) => {
    const user = req.user;
    const {currentPassword, newPassword, confirmPassword} = req.body;

    if(!currentPassword || !newPassword || !confirmPassword || currentPassword === '' || newPassword === '' || confirmPassword === ''){
        res.status(400).json({message: "Please fill all the fields."});
        throw new Error("Please fill all the fields.");
    }

    if(newPassword !== confirmPassword){
        res.status(400).json({message: "The new password and the confirmation password are different."});
        throw new Error("The new password and the confirmation password are different.");
    }

    if(await user.matchPassword(currentPassword)){
        user.password = newPassword;

        // Updating the user
        const updatedUser = await user.save();

        // Sending the user's information or an error
        if(updatedUser){
            // Removing the password from the user's information
            const returnUser = Object.fromEntries(Object.entries(updatedUser._doc).filter(([key]) => key !== 'password'));
            res.status(201).json({user: returnUser});
        }else{
            res.status(400).json({message: "An error occur while modifying the profile. Please retry later."});
            throw new Error("An error occur while modifying the profile. Please retry later.");
        }
    }else{
        res.status(400).json({message: "The current password is incorrect."});
        throw new Error("The current password is incorrect.");
    }
});

// @desc Remove profile picture from the user
// @route PUT /api/user/profile/deleteImage
// @access Private
const removeProfilePicture = asyncHandler(async (req, res) => {
    const user = req.user;

    // Deleting the old image
    if(user.profileImage !== '') await deleteProfilePicture(user.profileImage);
    // Applying the default image
    user.profileImage = getSeededRandomPfp(user.username);

    // Getting the average color of the image
    const color = await getAverageColorOfImage(`${RootPath}/uploads/user/${user.profileImage}`);
    user.profileColor.hex = color.hex;
    user.profileColor.rgb = color.rgb;
    user.profileColor.isDark = color.isDark;

    // Updating the user
    const updatedUser = await user.save();

    // Sending the user's information or an error
    if(updatedUser){
        res.status(201).json({user: updatedUser});
    }else{
        res.status(400).json({message: "An error occur while modifying the profile. Please retry later."});
        throw new Error("An error occur while modifying the profile. Please retry later.");
    }
});

// @desc Update a user from the DB using his id to add an achievement to his account
// @route PATCH /api/user/profile/:_id
// @access Private
const addAchievement = asyncHandler(async (req, res) => {
    const achievementId = req.params._id;
    const user = req.user;

    // Checking if the achievement exist and sending an error if no
    const achievement = await Achievement.findById(achievementId);
    if(!achievement){
        res.status(400).json({message: "The achievement doesn't exist."});
        throw new Error("The achievement doesn't exist.");
    }

    // Checking if the user already got the achievement
    if(user.achievements.indexOf(achievementId) >= 0){
        res.status(400).json({message: "The achievement is already set."});
        throw new Error("The achievement is already set.");
    }

    // Adding the achievement to the user and saving
    user.achievements.push(achievement);
    const updatedUser = await user.save();

    // Sending the user's information or an error
    if(updatedUser){
        res.status(201).json({updatedUser});
    }else{
        res.status(400).json({message: "An error occur while modifying the profile. Please retry later."});
        throw new Error("An error occur while modifying the profile. Please retry later.");
    }
});

// @desc Logout a user
// @route POST /api/user/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
    // Deleting the token
    res.cookie(JWT_NAME, '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: 'User has been logged out.'});
});

// @desc Getting a user from the DB using his id
// @route POST /api/user/profile/:_id
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
    // Getting a user using his id
    const user = await User.findById(req.params._id);

    // Sending the user's information
    res.status(200).json({user});
});

// @desc Getting the number of users
// @route POST /api/user/count
// @access Public
const getUserCount = asyncHandler(async (req, res) => {
    // Getting the number of users
    const count = await User.find().countDocuments();
    res.status(200).json({count});
});

// @desc Generate an OTP to delete a user
// @route POST /api/user/delete/otp
// @access Private
const generateDeleteOtp = asyncHandler(async (req, res) => {
    const email = req.user.email;
    const otp = createOTP(); // Generate a random 6 digits number
    res.status(201).json({'message': `An OTP has been sent.`});
    await sendEmail(email, "Are you sure about deleting your account?", `<p>Someone try to delete your account. If it isn't you, change your password quickly.</p><br/><p>Your OTP is: <br/><br/><b>${otp}</b></p>`);
    await Otp.findOneAndDelete().where({email, type: 'delete'}); // Deleting the old OTP if it exists
    await Otp.create({email, otp, type: 'delete'}); // Creating the new OTP
});

// @desc Deleting a user from his id
// @route POST /api/user/delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = req.user;
    const {otp, password} = req.body;

    // Checking that the password and the OTP are not empty
    if(!password || password === '' || !otp || otp === ''){
        res.status(400).json({message: "Please fill all the fields."});
        throw new Error("Please fill all the fields.");
    }

    // Checking if the OTP is correct and is less than 2 minutes old
    const twoMinutesAgo = new Date(Date.now() - 2 * 60000);
    const otpExists = await Otp.findOne({
        email: user.email,
        otp,
        type: 'delete',
        createdAt: {$gte: twoMinutesAgo}
    });
    if(!otpExists){
        res.status(400).json({message: "The OTP is incorrect."});
        throw new Error("The OTP is incorrect.");
    }

    // Checking if the password is correct
    if(await user.matchPassword(password)){
        const id = user._id;
        // Deleting the profile picture if it's not the default one
        if(user.profileImage !== '') await deleteProfilePicture(user.profileImage);

        // Deleting the user from the DB and deleting the token
        await User.findByIdAndDelete(id);
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({message: `The user has been deleted successfully.`});

        // Once the user is deleted, we delete all the notifications, logs and messages after transferring the data to the frontend
        await Notification.deleteMany({user: id});
        await Log.deleteMany({user: id});
        await Otp.deleteMany({email: user.email});
        // We don't delete the messages from the user till it's the policy of the app, everything will be there forever.
    }else{
        res.status(400).json({message: "An occur while attempting to delete the user."});
        throw new Error("An occur while attempting to delete the user.");
    }
});



/*-----------------------------------------*/
/*                  CRON JOB               */
/*-----------------------------------------*/


cron.schedule('*/5 * * * *', asyncHandler(async () => {
    // Deleting all the OTPs that are older than 15 minutes every 5 minutes
    await Otp.deleteMany({createdAt: {$lt: new Date(Date.now() - 15 * 60000)}});
}));


module.exports = {
    login,
    register,
    generateOtp,
    updateUserProfile,
    updateUserNotification,
    updateUserPassword,
    removeProfilePicture,
    addAchievement,
    logout,
    getUserProfile,
    getUserCount,
    generateDeleteOtp,
    deleteUser,
}