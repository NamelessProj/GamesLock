const sharp = require('sharp');
const RootPath = require('../rootPath');

const uploadImage = async (file, params={}) => {
    const defaults = {folder: '', filename: '', format: 'webp', width: 500, height: 500, fit: 'inside', quality: 90};
    const options = {...defaults, ...params}; // Merge defaults with params

    const path = options.folder !== '' ? `${RootPath}/uploads/${options.folder}` : `${RootPath}/uploads`;

    let ext = 'webp'; // Default format
    let filename = options.filename || `${Date.now()}-${Math.round(Math.random() * 1E9)}`; // Getting filename or generating one
    filename += '.';
    let success = false;

    const image = sharp(file.buffer).resize({width: options.width, height: options.height, fit: options.fit}); // Resize the image

    // Set the format of the image
    switch(options.format.toLowerCase()){
        case 'jpg':
        case 'jpeg':
            ext = 'jpeg';
            break;

        case 'png':
            ext = 'png';
            break;
    }

    image.toFormat(ext);
    image[ext]({quality: options.quality}); // Set quality of the image

    filename += ext;

    try{
        await image.toFile(`${path}/${filename}`); // Save the image
        success = true;
    }catch(error){
        console.error(error);
    }

    return success ? filename : ''; // Return the filename if success, otherwise return an empty string
}

module.exports = {uploadImage}