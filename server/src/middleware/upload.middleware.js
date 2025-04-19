import multer from 'multer'
import path from 'path'
import fs from 'fs';

// Saqlash joylarini dinamik qilish
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.resolve("uploads");

    if (file.fieldname === "profileImg") {
      uploadPath = path.resolve(process.cwd(), "uploads/profile");
    } else if (file.fieldname === "courseImg") {
      uploadPath = path.resolve(process.cwd(), "uploads/course");
    }

    // papka mavjud bo'lmasa yaratamiz
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;
