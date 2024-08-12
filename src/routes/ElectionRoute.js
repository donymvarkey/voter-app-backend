const express = require("express");
// const passport = require("passport");
const ElectionController = require("../controllers/ElectionController");
const middlewares = require("../middlewares");

const router = express.Router();

/**
 * @swagger
 * '/api/election':
 *  post:
 *     tags:
 *     - Election
 *     summary: Create an election
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - image
 *              - description
 *              - startDate
 *            properties:
 *              title:
 *                type: string
 *                default: ""
 *              image:
 *                type: string
 *                default: ""
 *              description:
 *                type: string
 *                default: ""
 *              startDate:
 *                type: date
 *                default: ""
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
router.post("/", middlewares.isAuthorised, ElectionController.createElection);

/**
 * @swagger
 * '/api/election':
 *  get:
 *     tags:
 *     - Election
 *     summary: List all elections
 *     responses:
 *      201:
 *        description: Elections list
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/", middlewares.isAuthorised, ElectionController.getElections);

/**
 * @swagger
 * '/api/election/{electionId}':
 *  get:
 *     tags:
 *     - Election
 *     summary: Get election details
 *     parameters:
 *      - in: path
 *        required: true
 *        name: electionId
 *        schema:
 *          type: string
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
router.get(
  "/:electionId",
  middlewares.isAuthorised,
  ElectionController.getElectionById
);

module.exports = router;
