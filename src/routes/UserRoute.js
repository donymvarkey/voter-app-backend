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

/**
 * @swagger
 * '/api/user/toggle/mfa':
 *  post:
 *     tags:
 *     - User
 *     summary: Toggle MFA
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: number
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
router.post("/toggle/mfa", middlewares.isAuthorised, UserController.toggleMFA);

/**
 * @swagger
 * '/api/user/profile':
 *  get:
 *     tags:
 *     - User
 *     summary: Get User profile
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
router.get("/profile", middlewares.isAuthorised, UserController.getUserProfile);

module.exports = router;
