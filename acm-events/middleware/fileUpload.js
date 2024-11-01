// const path = require('path'); // do not need path if storing image directly into mongodb atlas

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/img')
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

const multer = require('multer');

// tell multer to use in-memory storage rather than disk storage (/public/img)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (mimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type: only jpg, png, and gif file types allowed'));
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 2*1024*1024 },
    fileFilter: fileFilter
}).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            err.status = 400;
            next(err);
        } else if (err) {
            err.status = 400;
            next(err);
        } else if (req.file) {
            req.body.image = req.file.buffer.toString('base64'); // convert uploaded image file to Base64 string
            next();
        } else {
            req.body.image = null; // no file is uploaded
            next();
        }
    });
}