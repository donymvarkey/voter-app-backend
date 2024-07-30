const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: User login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
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
router.post("/login", AuthController.login);

/**
 * @swagger
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: User registration
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - fcm_token
 *            properties:
 *              firstName:
 *                type: string
 *                default: John
 *              lastName:
 *                type: string
 *                default: John
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!
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
router.post("/register", AuthController.register);

module.exports = router;
