const fs = require('fs');
const checkIfPfpIsDefault = require('./checkIfPfpIsDefault');
const RootPath = require('../rootPath');
const {sendEmail} = require('./sendEmail');

const deleteProfilePicture = async (imageName, maxIteration=5) => {
    const imagePath = `${RootPath}/uploads/user/${imageName}`;

    if(!checkIfPfpIsDefault(imageName)){
        let exist = false;
        let iteration = 0;
        do{
            exist = false;
            iteration++;
            if(fs.existsSync(imagePath)){
                exist = true;
                try{
                    fs.unlinkSync(imagePath);
                }catch(error){
                    console.error(error);
                }
            }
            if(iteration >= maxIteration) break;
        }while(exist);

        if(exist) await sendEmail(process.env.ADMIN_EMAIL, 'Error deleting a profile picture', `<p>Error deleting profile picture:<br/><b>${imageName}</b></p>`);
    }
}

const deleteImage = async (imageName, folderName="", maxIteration=5) => {
    const imagePath = `${RootPath}/uploads/${folderName !== "" ? `${folderName}/` : ""}${imageName}`;

    let exist = false;
    let iteration = 0;

    do{
        exist = false;
        iteration++;
        if(fs.existsSync(imagePath)){
            exist = true;
            try{
                fs.unlinkSync(imagePath);
            }catch(error){
                console.error(error);
            }
        }
        if(iteration >= maxIteration) break;
    }while(exist);

    if(exist) await sendEmail(process.env.ADMIN_EMAIL, 'Error deleting an image', `<p>Error deleting the image:<br/><b>${imageName}</b></p>`);
}

module.exports = {
    deleteProfilePicture,
    deleteImage,
};