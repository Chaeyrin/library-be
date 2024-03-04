import { ResponseError } from "../../index.js";

const findOneExists = async (Model, options = {}) => {
  const attribute = await Model.findOne(options);

  if (attribute) {
    throw new ResponseError(409, `${Model.name} already used`);
  }

  return attribute;
};

export { findOneExists };
