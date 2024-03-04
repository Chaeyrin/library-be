import { ResponseError } from "../../index.js";

const findPrimaryKey = async (Model, primaryKey, options = {}) => {
  const findId = await Model.findByPk(primaryKey, options);

  if (!findId) {
    throw new ResponseError(
      404,
      `${Model.name} with ID ${primaryKey} not found`
    );
  }

  return findId;
};

export { findPrimaryKey };
