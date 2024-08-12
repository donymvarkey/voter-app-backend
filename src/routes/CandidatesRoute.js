const express = require("express");
const multer = require("multer");
const CandidatesController = require("../controllers/CandidatesController");
const middlewares = require("../middlewares");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

/**
 * @swagger
 * '/api/candidate/{electionId}':
 *  post:
 *     tags:
 *     - Candidates
 *     summary: Add a new candidate
 *     parameters:
 *     - in: path
 *       required: true
 *       name: electionId
 *       schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - image
 *              - email
 *              - dob
 *            properties:
 *              name:
 *                type: string
 *                default: ""
 *              image:
 *                type: string
 *                default: ""
 *              email:
 *                type: string
 *                default: ""
 *              dob:
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
router.post(
  "/:electionId",
  middlewares.isAuthorised,
  CandidatesController.addNewCandidate
);

/**
 * @swagger
 * '/api/candidates/{electionId}':
 *  get:
 *     tags:
 *     - Candidates
 *     summary: Candidates list
 *     parameters:
 *     - in: path
 *       required: true
 *       name: electionId
 *       schema:
 *        type: string
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
router.get(
  "/list/:electionId",
  middlewares.isAuthorised,
  CandidatesController.getAllCandidates
);

/**
 * @swagger
 * '/api/candidates/{candidateId}':
 *  put:
 *     tags:
 *     - Candidates
 *     summary: Update candidate details
 *     parameters:
 *       - in: path
 *         required: true
 *         name: candidateId
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - image
 *              - dob
 *            properties:
 *              name:
 *                type: string
 *                default: ""
 *              email:
 *                type: string
 *                default: ""
 *              image:
 *                type: string
 *                default: ""
 *              dob:
 *                type: date
 *                default: ""
 *     responses:
 *      200:
 *        description: Updated
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.put(
  "/:candidateId",
  middlewares.isAuthorised,
  CandidatesController.updateCandidateDetails
);

/**
 * @swagger
 * '/api/candidates/{candidateId}':
 *  get:
 *     tags:
 *     - Candidates
 *     summary: Get candidate details
 *     parameters:
 *      - in: path
 *        required: true
 *        name: candidateId
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Candidate List
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get(
  "/:candidateId",
  middlewares.isAuthorised,
  CandidatesController.getCandidateDetails
);

/**
 * @swagger
 * '/api/candidates/bulk/{electionId}':
 *  post:
 *     tags:
 *     - Candidates
 *     summary: Candidate bulk Upload from excel sheet
 *     parameters:
 *      - in: path
 *        required: true
 *        name: electionId
 *        schema:
 *          type: string
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
 *      200:
 *        description: Process Started
 *      500:
 *        description: Server Error
 */
router.post(
  "/bulk/:electionId",
  upload.single("file"),
  middlewares.isAuthorised,
  CandidatesController.bulkUpload
);

module.exports = router;
