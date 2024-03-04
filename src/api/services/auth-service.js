import jtw from "jsonwebtoken";
import { UserModel } from "../models/index.js";
import {
  ResponseError,
  confirmPassword,
  findAllData,
  findOneExists,
  hashPassword,
  trimStringValues,
} from "../utils/index.js";
import { accessTokenSecret } from "../../config/env-constants.js";
import { validateEmail } from "../validator/email-validator.js";
import { validatePassword } from "../validator/password-validator.js";
import bcrypt from "bcrypt";

const register = async (request, next) => {
  const { full_name, username, email, password, confPassword, address } =
    trimStringValues(request);

  validateEmail(email);

  validatePassword(password);
  confirmPassword(password, confPassword);

  await findOneExists(UserModel, {
    where: { email },
  });

  // const hashedPassword = await hashPassword(password, next);

  const role = "user";

  return await UserModel.create({
    full_name,
    username,
    email,
    password,
    address,
    role,
  });
};

const login = async (req) => {
  const user = await findAllData(UserModel, {
    where: { username: req.body.username },
  });

  const userData = {
    id: user[0].id,
    full_name: user[0].full_name,
    username: user[0].username,
    email: user[0].email,
    role: user[0].role,
  };

  // const match = await bcrypt.compare(req.body.password, user[0].password);

  // if (!match) {
  //   throw new ResponseError(400, "Username or password wrong");
  // }

  const accessToken = jtw.sign(userData, accessTokenSecret, {
    expiresIn: "2 days",
  });

  return { ...userData, accessToken };
};

export default { register, login };
