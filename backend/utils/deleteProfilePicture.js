const fs = require('fs');
const checkIfPfpIsDefault = require('./checkIfPfpIsDefault');
const RootPath = require('../rootPath');

const deleteProfilePicture = (imageName) => {
    const imagePath = `${RootPath}/uploads/${imageName}`;

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if(!err && !checkIfPfpIsDefault(imageName)){
            fs.unlink(imagePath, (error) => {
                if(error) console.error(error);
            });
        }
    });
}

module.exports = deleteProfilePicture;