"use strict";
const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");
const appRootPath = require("app-root-path");
const maxSizeInBytes = 5 * 1024 * 1024;

const options = {
  info: {
    level: "info",
    dirname: "logs",
    json: true,
    handleExceptions: true,
    datePattern: "YYYY-MM-DD-HH",
    filename: `app.log`,
    format: format.combine(
      format.printf((i) =>
        i.level === "info" ? `${i.level}: ${i.timestamp} ${i.message}` : ""
      )
    ),
  },
  error: {
    level: "error",
    dirname: "logs",
    json: true,
    handleExceptions: true,
    filename: `app.log`,
    format: format.combine(
      format.printf((i) =>
        i.level === "error" ? `${i.level}: ${i.timestamp} ${i.message}` : ""
      )
    ),
  },
  console: {
    level: "debug",
    json: false,
    handleExceptions: true,
    colorize: true,
  },
};

const logger = new createLogger({
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
  ),
  transports: [
    new transports.File(options.info),
    new transports.File(options.error),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

// Function to clear the log file
const clearLogFile = (logFilePath) => {
  fs.truncate(logFilePath, 0, (err) => {
    if (err) {
      console.error("Error clearing log file:", err);
    } else {
      console.log("Log file cleared");
    }
  });
};

// Function to monitor log file size
const monitorLogFileSize = (logFilePath) => {
  fs.stat(logFilePath, (err, stats) => {
    if (err) {
      console.error("Error getting log file stats:", err);
      return;
    }

    if (stats.size > maxSizeInBytes) {
      clearLogFile(logFilePath);
    }
  });
};

const logPath = path.join(appRootPath.path, "/logs/app.log");

setInterval(() => {
  monitorLogFileSize(logPath);
}, 60 * 1000);

module.exports = { logger };
