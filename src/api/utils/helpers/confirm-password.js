import { ResponseError } from "../index.js";

const confirmPassword = (password, confPassword) => {
  if (!confPassword) {
    throw new ResponseError(400, "Confirm your password");
  }
  if (password !== confPassword) {
    throw new ResponseError(400, "Password doesn't match");
  }
};

export { confirmPassword };
