const multer = require('multer');
const path = require('path');
const replaceSpecialCharacters = require('replace-special-characters');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            let fileName = replaceSpecialCharacters(path.basename(file.originalname, ext).toLowerCase());
            fileName = fileName.split(' ').join('-');
            fileName = fileName.replace(/-{2,}/gm, '-');
            const finalFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${fileName}${ext}`;
            cb(null, finalFileName);
        }
    }),
    fileFilter: (req, file, cb) => {
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
});

module.exports = {
    upload,
};