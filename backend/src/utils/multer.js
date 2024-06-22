import Multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import HttpStatus from "./HttpStatus.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadPath = join(__dirname, '../../../client/src/data/user-avatar');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const multer = Multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, join(__dirname, '../../../client/src/data/user-avatar'));
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    limits: {
        fileSize: 3 * 1024 * 1024
    }
});

const uploads = Multer({
    storage: multer,
    limits: { fileSize: 10 * 1024 * 1024 }
});

const fileUploadMiddleware = (req, res, next) => {
    uploads.single('avatar')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE'){
                return res.status(HttpStatus.LIMIT_FILE_SIZE.code).send(HttpStatus.LIMIT_FILE_SIZE.status);
            } else if (err.code === 'INVALID_FORMAT'){
                return res.status(HttpStatus.INVALID_FORMAT.code).send(HttpStatus.INVALID_FORMAT.status);
            } else {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(HttpStatus.INTERNAL_SERVER_ERROR.status);
            }
        }
        next();
    });
};

export default fileUploadMiddleware;