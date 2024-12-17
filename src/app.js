import serverless from "serverless-http";
import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("src/swagger/swagger.json"), "utf-8")
);

const app = express();
const PORT = process.env.PORT || 3003;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api-docs", (req, res) => {
  res.json(swaggerDocument);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", routes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

export const handler = serverless(app);

if (import.meta.url === new URL(import.meta.url).href) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
