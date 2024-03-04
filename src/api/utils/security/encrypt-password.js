import bcrypt from "bcrypt";
import { ResponseError } from "../index.js";

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw new ResponseError(400, `${err.message}`);
  }
};

export { hashPassword };
