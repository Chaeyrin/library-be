import express from "express";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import sequelize from "../config/sequelize-connect.js";
import { apiRoot } from "../config/env-constants.js";
import { corsMiddleware } from "../config/cors-config.js";
import { publicRouter } from "./routes/public-api.js";
import { verifyRouter } from "./routes/verify-api/index.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

export const app = express();

app.get(`/${apiRoot}`, (req, res) => {
  res.json({ message: "🌱🍀🌵🎋🍃🕵️ Hey this is hibbanmr's server .." });
});

app.use(fileUpload());
app.use(express.static("public"));
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(`/${apiRoot}`, publicRouter);
app.use(`/${apiRoot}`, verifyRouter);
app.use(errorMiddleware);

// await sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");
