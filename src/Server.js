"use strict";
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {
  connectMongodb,
  connectToRedis,
} = require("./database/DataBaseController");
const returnResponse = require("./helpers/apiResponse");

const AuthRoute = require("./routes/AuthRoute");
const ElectionRoute = require("./routes/ElectionRoute");
const FileUploadRoute = require("./routes/FileUploadRoute");
const CandidatesRoute = require("./routes/CandidatesRoute");
const UserRoute = require("./routes/UserRoute");
const { logger } = require("./logger/Logger");

class Server {
  constructor(options) {
    this.options = options;
    this.api = null;
  }

  async configServer() {
    var api = express();

    api.use(express.urlencoded({ limit: "10mb", extended: true }));
    api.use(express.json({ limit: "10mb", extended: true }));
    api.use(cors()); //allow cross domain requesting of urls
    api.use(morgan("dev"));

    //echo route
    api.use("/api/health", function (req, res) {
      res.json({
        health: true,
      });
    });

    api.set("x-powered-by", false);

    this.api = api;

    return true;
  }

  async mountRoutes() {
    this.api.use("/api/auth", AuthRoute);
    this.api.use("/api/election", ElectionRoute);
    this.api.use("/api/file", FileUploadRoute);
    this.api.use("/api/candidates", CandidatesRoute);
    this.api.use("/api/user", UserRoute);
    return true;
  }

  async startServer() {
    await this.configServer();

    connectMongodb(this.options.mongodb.uri);
    connectToRedis(this.options.redis_uri);
    await this.mountRoutes();

    this.api.use((req, res) => {
      logger.error("Route not found");
      res.status(404).json({
        msg: "Route not found",
        status: false,
      });
      // next(error);
    });

    this.api.use((error, req, res, next) => {
      const msg = error.message || "Internal Server Error";
      logger.error(`Something went wrong:: error`);
      res.status(500).json({
        msg: "Internal server error",
        status: false,
      });
    });

    const server = this.api.listen(this.options.port, () => {
      const address = server.address();
      const host = address.address === "::" ? "localhost" : address.address;
      const port = address.port;
      logger.info(`Listening on http://${host}:${port}`);
    });

    const shutdown = (signal) => {
      logger.info(`Received signal ${signal}. Shutting down gracefully`);
      server.close(() => {
        logger.info("Closed out remaining connections");
        process.exit(0);
      });

      // Force close server after 5 seconds
      setTimeout(() => {
        logger.error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 5000);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  }
}

module.exports = Server;
