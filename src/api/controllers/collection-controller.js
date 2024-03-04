import collectionService from "../services/collection-service.js";

export const createCollection = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await collectionService.create(request);
    res.status(200).json({
      message: "Data created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getDataCollection = async (req, res, next) => {
  try {
    const result = await collectionService.get();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataCollectionById = async (req, res, next) => {
  try {
    const collectionId = req.params.id;
    const result = await collectionService.getById(collectionId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataCollectionByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await collectionService.getByUser(userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const deleteCollection = async (req, res, next) => {
  try {
    const request = req.body;
    await collectionService.remove(request);
    res.status(200).json({
      message: "Data deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};
