import multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadPath = join(__dirname, '../../../client/src/data/user-avatar');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, join(__dirname, '../../../client/src/data/user-avatar'));
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploads = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

export { uploads };