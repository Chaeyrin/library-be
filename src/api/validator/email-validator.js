import validator from "validator";
import { ResponseError } from "../utils/error/response-error.js";

const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new ResponseError(400, "Invalid email address");
  }
};

export { validateEmail };
