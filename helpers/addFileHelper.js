import { config } from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";

import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import util from "util";

config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      cb(null, `${fileName}${path.extname(file.originalname)}`);
    },
  }),
});

export const addFile = async (req, res) => {
  const uploadFile = util.promisify(upload.single("file"));
  await uploadFile(req, res);
};
// const uploadSingle = (req, res) => {
//   // req.file contains a file object
//   res.json(req.file);
// };

// const uploadMultiple = (req, res) => {
//   // req.files contains an array of file object
//   res.json(req.files);
// };

// const uploadSingle = async (req, res) => {
//   const uploadFile = util.promisify(upload.single("file"));
//   try {
//     await uploadFile(req, res);
//     res.json(req.file);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// app.post('/upload-single',   upload.single('file'), uploadSingle);
// router.post('/upload-multiple', upload.array('files', 5), uploadController.uploadMultiple);
