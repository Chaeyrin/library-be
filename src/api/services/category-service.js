import {
  BookCategoryAssociation,
  BookCategoryModel,
  BookModel,
} from "../models/index.js";
import { ResponseError, findAllData, findPrimaryKey } from "../utils/index.js";

const create = async (request) => {
  const { category_title, category_description } = request;

  const category = await BookCategoryModel.findOne({
    where: { category_title },
  });

  if (category) {
    throw new ResponseError(409, "Category book already used");
  }

  return await BookCategoryModel.create({
    category_title,
    category_description,
  });
};

const createAssociation = async (request) => {
  const { bookId, categoryId } = request;

  await findPrimaryKey(BookModel, bookId);

  await findPrimaryKey(BookCategoryModel, categoryId);

  return await BookCategoryAssociation.create({
    bookId,
    categoryId,
  });
};

const get = async () => {
  return await findAllData(BookCategoryModel, {
    include: [
      {
        model: BookModel,
        attributes: [
          "id",
          "book_tittle",
          "author",
          "publisher",
          "year_published",
          "url",
          "createdAt",
          "updatedAt",
        ],
        through: { attributes: [] },
      },
    ],
  });
};

const getValue = async () => {
  return await findAllData(BookCategoryModel, {
    attributes: ["id", "category_title"],
    include: [
      {
        model: BookModel,
        attributes: ["id"],
        through: { attributes: [] },
      },
    ],
  });
};

const getById = async (categoryId) => {
  return await findPrimaryKey(BookCategoryModel, categoryId, {
    include: [
      {
        model: BookModel,
        attributes: [
          "id",
          "book_tittle",
          "author",
          "publisher",
          "url",
          "year_published",
          "createdAt",
          "updatedAt",
        ],
        through: { attributes: [] },
      },
    ],
  });
};

const getAssociationById = async (categoryId) => {
  const associations = await findAllData(BookCategoryAssociation, {
    where: { categoryId },
    include: [
      {
        model: BookCategoryModel,
        attributes: ["id", "category_title", "category_description"],
      },
      {
        model: BookModel,
      },
    ],
  });

  const groupedByCategory = new Map();

  associations.forEach((association) => {
    const { category_title, category_description } = association.book_category;
    const bookInfo = association.book;

    if (!groupedByCategory.has(categoryId)) {
      groupedByCategory.set(categoryId, {
        categoryId,
        category_title,
        category_description,
        books: [],
      });
    }

    groupedByCategory.get(categoryId).books.push(bookInfo);
  });

  return groupedByCategory.values().next().value || {};
};

const remove = async (categoryId) => {
  const category = await findPrimaryKey(BookCategoryModel, categoryId);
  return await category.destroy();
};

export default {
  create,
  createAssociation,
  get,
  getById,
  getValue,
  getAssociationById,
  remove,
};
