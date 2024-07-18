const express = require("express");
const UserController = require("../controllers/UserController");
const middlewares = require("../middlewares");

const router = express.Router();

router.post("/", middlewares.isAuthorised, UserController.updateDeviceToken);

module.exports = router;
