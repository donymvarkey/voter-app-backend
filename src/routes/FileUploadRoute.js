const express = require("express");
const FileUploadController = require("../controllers/FileUploadController");
const middlewares = require("../middlewares");
const { upload } = require("../config/filebase");

const router = express.Router();

/**
 * @swagger
 * '/api/file':
 *  post:
 *     tags:
 *     - File Upload
 *     summary: Upload file to storage
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
  "/",
  middlewares.isAuthorised,
  upload.single("file"),
  FileUploadController.uploadFile
);

module.exports = router;
