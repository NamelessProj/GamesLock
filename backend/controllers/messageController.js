const asyncHandler = require("express-async-handler");


const getMessages = asyncHandler(async (req, res) => {
    res.status(200).json({'message': 'lol'});
});

module.exports = {
    getMessages,
}