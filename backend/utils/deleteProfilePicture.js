const fs = require('fs');
const checkIfPfpIsDefault = require('./checkIfPfpIsDefault');
const RootPath = require('../rootPath');

const deleteProfilePicture = (imageName) => {
    const imagePath = `${RootPath}/uploads/${imageName}`;
    const maxIterations = 5;

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
    }
}

module.exports = deleteProfilePicture;