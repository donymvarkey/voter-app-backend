const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, GetObjectAclCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  endpoint: process.env.FILEBASE_ENDPOINT,
  region: process.env.FILEBASE_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

module.exports = {
  upload,
  s3,
};
