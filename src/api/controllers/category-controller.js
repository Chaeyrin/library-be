import categoryService from "../services/category-service.js";

export const createCategory = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await categoryService.create(request);
    res.status(200).json({
      message: "Data created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const createBookCategory = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await categoryService.createAssociation(request);
    res.status(200).json({
      message: "Data created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getDataCategory = async (req, res, next) => {
  try {
    const result = await categoryService.get();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getValueCategory = async (req, res, next) => {
  try {
    const result = await categoryService.getValue();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const result = await categoryService.getById(categoryId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getAssociationCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await categoryService.getAssociationById(categoryId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    await categoryService.remove(categoryId);
    res.status(200).json({
      message: `Category deleted successfully`,
    });
  } catch (e) {
    next(e);
  }
};
