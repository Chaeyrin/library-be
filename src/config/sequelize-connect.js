import { Sequelize } from "sequelize";
import { dbName, dbUser, dbHost, dbDialect } from "./env-constants.js";

const sequelize = new Sequelize(dbName, dbUser, "", {
  host: dbHost,
  dialect: dbDialect,
});

export default sequelize;
