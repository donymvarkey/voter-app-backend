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
      return true;
    })
    .catch((err) => {
      logger.error(`Failed to connect to MongoDB: ${err}`);
      return false;
    });
};

const connectToRedis = async (uri) => {
  logger.info(`Connecting to redis instance:: ${uri}`);

  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  await redisClient.connect();

  redisClient.on("connect", () => {
    logger.info(`Connected to redis`);
  });

  redisClient.on("error", (err) => {
    logger.error(`Failed to connect to redis:: ${err}`);
  });
};

module.exports = { connectMongodb, connectToRedis };
