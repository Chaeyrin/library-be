import validator from "validator";
import { ResponseError } from "../utils/index.js";

const validatePassword = (password) => {
  if (!validator.isLength(password, { min: 8 })) {
    throw new ResponseError(400, "Password must be at least 8 characters long");
  }

  // if (
  //   !validator.matches(
  //     password,
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
  //   )
  // ) {
  //   throw new ResponseError(
  //     400,
  //     "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
  //   );
  // }
};

export { validatePassword };
