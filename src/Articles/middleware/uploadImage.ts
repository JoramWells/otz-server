import multer from 'multer'
import path from 'path';

const storage = multer.diskStorage({
  destination: (_, file: Express.Multer.File, cb:(error: Error|null, destination: string)=>void) => {
    cb(null, path.resolve(__dirname, "../../uploads"));
  },
  filename: (_, file:Express.Multer.File, cb:(error: Error|null, destination: string)=>void) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  limits:{
    fileSize: 10 * 1024 * 1024,
  },
  storage,
});

export {upload} 

//
// upload.single('file');