import express from "express";
import {
  createBookCategory,
  createCategory,
  deleteCategory,
  getAssociationCategoryById,
  getCategoryById,
  getDataCategory,
  getValueCategory,
} from "../../controllers/category-controller.js";

const categoryRouter = new express.Router();

categoryRouter.post(`/category`, createCategory);
categoryRouter.post(`/book-category`, createBookCategory);
categoryRouter.get(`/category`, getDataCategory);
categoryRouter.get(`/category-value`, getValueCategory);
categoryRouter.get(`/category/:id`, getCategoryById);
categoryRouter.get(
  `/category-association/:categoryId`,
  getAssociationCategoryById
);
categoryRouter.delete("/category/:id", deleteCategory);

export { categoryRouter };
