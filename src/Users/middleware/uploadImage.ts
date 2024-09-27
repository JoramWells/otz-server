import multer from 'multer'
import path from 'path';
import fs from 'fs'

const dir = '../uploads'

// CECK IF DIR EXISTS

if(!fs.existsSync(dir)){
  fs.mkdirSync(dir, {recursive:true})
}

const storage = multer.diskStorage({
  destination: (_, file: Express.Multer.File, cb:(error: Error|null, destination: string)=>void) => {
    cb(null, path.resolve(__dirname, dir));
  },
  filename: (_, file:Express.Multer.File, cb:(error: Error|null, destination: string)=>void) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  limits:{
    fieldSize: 2 * 1024 * 1024 ,
    fileSize: 10 * 1024 * 1024,
  },
  storage,
});

export {upload} 

//
// upload.single('file');