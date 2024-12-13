const fs = require('fs');
const checkIfPfpIsDefault = require('./checkIfPfpIsDefault');
const RootPath = require('../rootPath');
const {sendEmail} = require('./sendEmail');

const deleteProfilePicture = async (imageName, maxIterations=5) => {
    const imagePath = `${RootPath}/uploads/${imageName}`;

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
        }while(exist || iteration < maxIterations);

        if(exist) await sendEmail(process.env.ADMIN_EMAIL, 'Error deleting an image', `<p>Error deleting profile picture:<br/><b>${imageName}</b></p>`);
    }
}

module.exports = deleteProfilePicture;