const fs = require('fs');
const checkIfPfpIsDefault = require('./checkIfPfpIsDefault');
const RootPath = require('../rootPath');
const {sendEmail} = require('./sendEmail');

const deleteFile = async (path, errorEmailSubject, errorEmailText) => {
    fs.unlink(path, (err) => {
        if(err){
            console.error(err);
            sendEmail(process.env.ADMIN_EMAIL, errorEmailSubject, errorEmailText);
        }
    });
}

const deleteProfilePicture = async (imageName) => {
    const path = `${RootPath}/uploads/user/${imageName}`;

    if(!checkIfPfpIsDefault(imageName)){
        await deleteFile(path, 'Error deleting a profile picture', `<p>Error deleting profile picture:<br/><b>${imageName}</b></p><p>The image might as well not exist.</p>`);
    }
}

const deleteImage = async (imageName, folderName="") => {
    const path = `${RootPath}/uploads/${folderName !== "" ? `${folderName}/` : ""}${imageName}`;

    await deleteFile(path,'Error deleting an image', `<p>Error deleting the image:<br/><b>${imageName}</b></p><p>The image might as well not exist.</p>`);
}

module.exports = {
    deleteProfilePicture,
    deleteImage,
};