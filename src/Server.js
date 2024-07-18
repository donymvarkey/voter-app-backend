"use strict";
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectMongodb } = require("./database/DataBaseController");
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
    api.use("/echo", function (req, res) {
      res.json({
        health: true,
      });
    });

    // api.use("/s", express.static("./src/public"));
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
    await this.mountRoutes();

    this.api.use((req, res, next) => {
      logger.error("Route not found");
      returnResponse({ code: 404, msg: "Endpoint not found", data: null }, res);
      next(error);
    });

    this.api.use((error, req, res, next) => {
      const msg = error.message || "Internal Server Error";
      logger.error(`Something went wrong:: ${JSON.stringify(error)}`);
      returnResponse({ code: 500, msg, data: null }, res);
    });

    const server = this.api.listen(this.options.port, () => {
      const address = server.address();
      const host = address.address === "::" ? "localhost" : address.address;
      const port = address.port;
      logger.info(`Listening on http://${host}:${port}`);
    });

    const shutdown = () => {
      console.log("Received signal, shutting down gracefully...");
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
