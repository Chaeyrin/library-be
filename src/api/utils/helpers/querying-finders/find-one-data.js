import { ResponseError } from "../../index.js";

const findOneData = async (Model, options = {}) => {
  const attribute = await Model.findOne(options);

  if (!attribute) {
    throw new ResponseError(404, `${Model.name} not found`);
  }

  return attribute;
};

export { findOneData };
