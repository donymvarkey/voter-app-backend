const express = require("express");
const FileUploadController = require("../controllers/FileUploadController");
const middlewares = require("../middlewares");
const { upload } = require("../config/filebase");

const router = express.Router();

router.post(
  "/",
  middlewares.isAuthorised,
  upload.single("file"),
  FileUploadController.uploadFile
);

module.exports = router;
