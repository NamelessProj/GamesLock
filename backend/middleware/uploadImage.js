const multer = require('multer');
const path = require('path');

// File filter function
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    // Check file extension and mimetype
    const mimeType = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    // Check if both are true
    if(allowedMimeTypes.includes(file.mimetype) && mimeType && extname){
        cb(null, true);
    }else{
        cb(new Error('Only .jpeg, jpg or .png files are allowed'), false);
    }
}

// Multer middleware
const uploadImage = multer({
    storage: multer.memoryStorage(),
    fileFilter
});

module.exports = {uploadImage};