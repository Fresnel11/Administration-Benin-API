// src/config/swagger.js
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json" assert { type: "json" };

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
