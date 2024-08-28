const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../backend/uploads/profilePictures'); 
  },
  // filename: (req, file, cb) => {
  //   cb(null, `${Date.now()}-${file.originalname}`); // File naming convention
  // },
  filename: (req, file, cb) => {
    // Sanitize email to be a valid filename
    const email = req.body.email.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const ext = path.extname(file.originalname);
    cb(null, `${email}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

module.exports = upload;
