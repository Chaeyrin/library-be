import { ResponseError } from "../../index.js";

const findAllData = async (Model, options = {}) => {
  const data = await Model.findAll(options);

  if (!data.length) {
    throw new ResponseError(404, `Data ${Model.name} not available`);
  }

  return data;
};

export { findAllData };
