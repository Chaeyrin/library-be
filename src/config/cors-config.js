import cors from "cors";
import { dbHost, clientPort, ipAddress } from "./env-constants.js";

const allowedOrigins = [
  `http://${dbHost}:${clientPort}`,
  `http://${ipAddress}:${clientPort}`,
];

const corsOptions = {
  credentials: true,
  origin: allowedOrigins,
};

const corsMiddleware = cors(corsOptions);

export { corsMiddleware };
