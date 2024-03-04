import validator from "validator";
import { ResponseError } from "../utils/error/response-error.js";

const validatePositiveInteger = (value) => {
  if (!validator.isInt(value.toString(), { min: 1 })) {
    throw new ResponseError(400, "Value must be a positive");
  }
};

export { validatePositiveInteger };
