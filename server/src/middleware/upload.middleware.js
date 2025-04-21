import multer from 'multer'
import path from 'path'
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.resolve("uploads");

    if (file.fieldname === "profileImg") {
      uploadPath = path.resolve(process.cwd(), "uploads/profile");
    } else if (file.fieldname === "courseImg") {
      uploadPath = path.resolve(process.cwd(), "uploads/course");
    } else if (file.fieldname === "media") {
      uploadPath = path.resolve(process.cwd(), "uploads/lesson");
    }

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "media") {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Faqat video fayllarga ruxsat beriladi!"), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
