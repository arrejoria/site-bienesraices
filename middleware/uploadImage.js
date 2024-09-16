import multer from "multer";
import { promises as fsPromises } from "fs";
import path from "path";
import { generateId } from "../helpers/tokens.js";

const uploadDir = path.join('./public/uploads/');
const ensureUploadDir = async () => {
    try {
        // create Uploads folter if doesn't exist
        await fsPromises.mkdir(uploadDir, { recursive: true });
        console.log('Directorio creado o ya existente:', uploadDir);
    } catch (error) {
        console.error('Error al crear el directorio:', error);
    }
}

await ensureUploadDir();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); //
  },
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  },
  filename: function (req, file, cb) {
    const fileId = generateId();
    const ext = path.extname(file.originalname);

    cb(null, fileId + ext);
  },
});

const upload = multer({ 
  storage: storage
 }).array('images');

export default upload;
