const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../config/filebase");

const uploadFile = async (req, res, next) => {
  try {
    const commandGetObject = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: req.file?.originalname,
    });
    const response = await s3.send(commandGetObject);
    url = `https://ipfs.filebase.io/ipfs/${response.Metadata?.cid}`;
    res.status(200).json({
      status: true,
      data: url,
      msg: "file uploaded",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile };
