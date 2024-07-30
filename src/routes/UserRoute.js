const express = require("express");
const UserController = require("../controllers/UserController");
const middlewares = require("../middlewares");

const router = express.Router();

/**
 * @swagger
 * '/api/user/device-token':
 *  put:
 *     tags:
 *     - User
 *     summary: Update Device token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - fcm_token
 *            properties:
 *              fcm_token:
 *                type: string
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
router.put(
  "/device-token",
  middlewares.isAuthorised,
  UserController.updateDeviceToken
);

module.exports = router;
