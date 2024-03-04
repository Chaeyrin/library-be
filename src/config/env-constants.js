import { getIp } from "../api/utils/network/my-ip-address.js";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT;
const apiRoot = process.env.API_ROOT;
const ipAddress = getIp();
const appPort = process.env.APP_PORT;
const clientPort = process.env.PORT_CLIENT;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export {
  dbName,
  dbUser,
  dbHost,
  dbDialect,
  apiRoot,
  ipAddress,
  appPort,
  clientPort,
  accessTokenSecret,
};
