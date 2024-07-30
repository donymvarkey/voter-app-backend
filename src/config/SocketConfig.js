const ws = require("ws");
const { logger } = require("../logger/Logger");

const setupSocketServer = (server) => {
  try {
    const wsServer = new ws.Server({ noServer: true });
    wsServer.on("connection", (socket) => {
      logger.info("Connected to socket");
      socket.on("message", (message) => console.log(message));
    });

    server.on("upgrade", (request, socket, head) => {
      wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit("connection", socket, request);
      });
    });
  } catch (error) {
    logger.error("error:", error);
  }
};

module.exports = { setupSocketServer };
