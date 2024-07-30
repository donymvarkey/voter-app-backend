const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Voter",
      description: "API endpoints for a online voting platform",
      contact: {
        name: "Dony M Varkey",
        email: "donyvarkey@gmail.com",
        url: "https://github.com/donymvarkey/voter-app-backend",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3456/",
        description: "Dev server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerSpec };
