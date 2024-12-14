const multer = require('multer');
const path = require('path');
const removeDiacritics = require('../utils/removeDiacritics');
const RootPath = require('../rootPath');

const filename = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    let fileName = path.basename(file.originalname, ext).toLowerCase();
    fileName = fileName.replace(/['"]*/g, '');
    fileName = removeDiacritics(fileName);
    fileName = fileName.split(' ').join('-');
    fileName = fileName.replace(/-{2,}/g, '-');
    const finalFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${fileName}${ext}`;
    cb(null, finalFileName);
}

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const mimeType = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if(allowedMimeTypes.includes(file.mimetype) && mimeType && extname){
        cb(null, true);
    }else{
        cb(new Error('Only .jpeg, jpg or .png files are allowed'));
    }
}

const uploadPfp = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${RootPath}/uploads/user`);
        },
        filename
    }),
    fileFilter
});

const uploadImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${RootPath}/uploads`);
        },
        filename
    }),
    fileFilter
});

module.exports = {
    uploadPfp,
    uploadImage,
};