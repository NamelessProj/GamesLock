const multer = require('multer');
const path = require('path');

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

const uploadImage = multer({
    storage: multer.memoryStorage(),
    fileFilter
});

module.exports = {uploadImage};