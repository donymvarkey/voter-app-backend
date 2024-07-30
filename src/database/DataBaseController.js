/**
 * DataBaseController.js
 * Includes controllers for MongoDB
 * Add controller for other databases from here
 */
const mongoose = require("mongoose");
const { createClient } = require("redis");
const { logger } = require("../logger/Logger");

const connectMongodb = async (uri) => {
  logger.info(`Connecting to mongodb: ${uri}`);
  mongoose.Promise = global.Promise;
  await mongoose
    .connect(uri)
    .then(() => {
      logger.info("Connected to mongodb instance");
    })
    .catch((err) => {
      logger.error(`Failed to connect to MongoDB: ${err}`);
    });
};

const connectToRedis = async (uri) => {
  // console.log("Connecting to redis instance", uri);
  logger.info(`Connecting to redis instance:: ${uri}`);

  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("connect", () => {
    logger.info(`Connected to redis`);
  });

  redisClient.on("error", (err) => {
    logger.error(`Failed to connect to redis:: ${err}`);
    process.exit();
  });

  await redisClient.connect();
};

module.exports = { connectMongodb, connectToRedis };
