const sharp = require('sharp');
const RootPath = require('../rootPath');

const uploadImage = async (file, folder="") => {
    const path= folder ? `${RootPath}/uploads/${folder}` : `${RootPath}/uploads`;
    const ext = "webp";
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
    let success = false;

    try{
        await sharp(file.buffer)
            .resize({width: 500, height: 500, fit: 'inside'})
            .toFormat(ext)
            .webp({quality: 90})
            .toFile(`${path}/${filename}`);
        success = true;
    }catch(error){
        console.error(error);
    }

    return success ? filename : '';
}

module.exports = {uploadImage}