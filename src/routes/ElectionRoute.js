const express = require("express");
// const passport = require("passport");
const ElectionController = require("../controllers/ElectionController");
const middlewares = require("../middlewares");

const router = express.Router();

router
  .post("/", middlewares.isAuthorised, ElectionController.createElection)
  .get("/", middlewares.isAuthorised, ElectionController.getElections)
  .get(
    "/:electionId",
    middlewares.isAuthorised,
    ElectionController.getElectionById
  );

module.exports = router;
