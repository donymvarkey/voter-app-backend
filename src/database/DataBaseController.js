/**
 * DataBaseController.js
 * Includes controllers for MongoDB
 * Add controller for other databases from here
 */
const mongoose = require("mongoose");
const { logger } = require("../logger/Logger");

const connectMongodb = async (uri) => {
  console.log("Connecting to mongodb", uri);
  mongoose.Promise = global.Promise;
  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB: ", err);
    });
};

module.exports = { connectMongodb };
