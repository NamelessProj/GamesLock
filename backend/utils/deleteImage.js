const fs = require('fs');
const checkIfPfpIsDefault = require('./checkIfPfpIsDefault');
const RootPath = require('../rootPath');
const {sendEmail} = require('./sendEmail');

const deleteFile = (path, maxIteration=5) => {
    let exist = false;
    let iteration = 0;

    do{
        exist = false;
        iteration++;

        if(fs.existsSync(path)){
            exist = true;

            try{
                fs.unlinkSync(path);
            }catch(error){
                console.error(error);
            }
        }

        if(iteration >= maxIteration) break;
    }while(exist);

    return exist;
}

const deleteProfilePicture = async (imageName, maxIteration=5) => {
    const path = `${RootPath}/uploads/user/${imageName}`;

    if(!checkIfPfpIsDefault(imageName) && deleteFile(path, maxIteration)){
        await sendEmail(process.env.ADMIN_EMAIL, 'Error deleting a profile picture', `<p>Error deleting profile picture:<br/><b>${imageName}</b></p>`);
    }
}

const deleteImage = async (imageName, folderName="", maxIteration=5) => {
    const path = `${RootPath}/uploads/${folderName !== "" ? `${folderName}/` : ""}${imageName}`;

    if(deleteFile(path, maxIteration)) await sendEmail(process.env.ADMIN_EMAIL, 'Error deleting an image', `<p>Error deleting the image:<br/><b>${imageName}</b></p>`);
}

module.exports = {
    deleteProfilePicture,
    deleteImage,
};