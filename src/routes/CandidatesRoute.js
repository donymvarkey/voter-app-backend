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

router
  .post(
    "/:electionId",
    middlewares.isAuthorised,
    CandidatesController.addNewCandidate
  )
  .get(
    "/list/:electionId",
    middlewares.isAuthorised,
    CandidatesController.getAllCandidates
  );
router.put(
  "/:candidateId",
  middlewares.isAuthorised,
  CandidatesController.updateCandidateDetails
);
router.get(
  "/:candidateId",
  middlewares.isAuthorised,
  CandidatesController.getCandidateDetails
);
router.post(
  "/bulk/:electionId",
  upload.single("file"),
  middlewares.isAuthorised,
  CandidatesController.bulkUpload
);

module.exports = router;
