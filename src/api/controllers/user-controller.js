import userServices from "../services/user-services.js";

export const createOfficer = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userServices.create(request);
    res.status(200).json({
      message: "Data created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getDataUser = async (req, res, next) => {
  try {
    const result = await userServices.getData();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userServices.getById(userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const request = req.body;
    const result = await userServices.update(userId, request);
    res.status(200).json({
      message: `ID User ${userId} updated successfully`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await userServices.remove(userId);
    res.status(200).json({
      message: `ID User ${userId} deleted successfully`,
    });
  } catch (e) {
    next(e);
  }
};
