import { UserModel } from "../models/index.js";
import { validateEmail, validatePassword } from "../validator/index.js";
import {
  trimStringValues,
  hashPassword,
  findAllData,
  findPrimaryKey,
  confirmPassword,
  findOneExists,
} from "../utils/index.js";

const create = async (request, next) => {
  const { full_name, username, email, password, confPassword, address, role } =
    trimStringValues(request);

  validateEmail(email);

  validatePassword(password);
  confirmPassword(password, confPassword);

  await findOneExists(UserModel, {
    where: { email },
  });

  const hashedPassword = await hashPassword(password, next);

  return await UserModel.create({
    full_name,
    username,
    email,
    password: hashedPassword,
    address,
    role,
  });
};

const getData = async () => {
  return await findAllData(UserModel);
};

const getById = async (userId) => {
  return await findPrimaryKey(UserModel, userId);
};

const update = async (userId, request) => {
  const user = await findPrimaryKey(UserModel, userId);

  const { full_name, email, username, password, address } =
    trimStringValues(request);

  validateEmail(email);

  // validatePassword(password);

  // const hashedPassword = await hashPassword(password);

  return await user.update({
    full_name,
    email,
    username,
    address,
  });
};

const remove = async (userId) => {
  const user = await findPrimaryKey(UserModel, userId);
  return await user.destroy();
};

export default { create, getData, getById, update, remove };
