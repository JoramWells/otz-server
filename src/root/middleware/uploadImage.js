const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = '../uploads';

// CECK IF DIR EXISTS

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, path.resolve(__dirname, dir));
  },
  filename: (_, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  limits: {
    fieldSize: 2 * 1024 * 1024,
    fileSize: 10 * 1024 * 1024,
  },
  storage,
});

module.exports = upload;

//
// upload.single('file');
