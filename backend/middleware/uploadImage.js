const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('Only .jpeg or .png files are allowed'));
        }
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            return cb(
                new Error(
                    'only upload files with jpg, jpeg, png.'
                )
            );
        }
        cb(undefined, true);
    }
});

module.exports = {
    upload,
};