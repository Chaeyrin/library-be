import validator from "validator";
import { ResponseError } from "../utils/error/response-error.js";

const validateDate = (dateString) => {
  if (!validator.isDate(dateString, { format: "YYYY-MM-DD" })) {
    throw new ResponseError(400, "Use date format YYYY-MM-DD");
  }
};

export { validateDate };
