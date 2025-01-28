const sharp = require('sharp');
const RootPath = require('../rootPath');

const uploadImage = async (file, params={}) => {
    const defaults = {folder: '', filename: '', format: 'webp', width: 500, height: 500, fit: 'inside', quality: 90};
    const options = {...defaults, ...params};

    const path = options.folder !== '' ? `${RootPath}/uploads/${options.folder}` : `${RootPath}/uploads`;

    let ext = 'webp';
    let filename = options.filename !== '' ? `${options.filename}.` : `${Date.now()}-${Math.round(Math.random() * 1E9)}.`;
    let success = false;

    const image = sharp(file.buffer).resize({width: options.width, height: options.height, fit: options.fit});

    switch(options.format.toLowerCase()){
        case 'jpg':
        case 'jpeg':
            ext = 'jpeg';
            image.toFormat(ext);
            image.jpeg({quality: options.quality});
            break;

        case 'png':
            ext = 'png';
            image.toFormat(ext);
            image.png({quality: options.quality});
            break;

        case 'webp':
        default:
            image.toFormat(ext);
            image.webp({quality: options.quality});
            break;
    }
    filename += ext;

    try{
        await image.toFile(`${path}/${filename}`);
        success = true;
    }catch(error){
        console.error(error);
    }

    return success ? filename : '';
}

module.exports = {uploadImage}