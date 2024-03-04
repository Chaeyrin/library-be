import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../../config/sequelize-connect.js";
import {
  BookCategoryAssociation,
  BookCategoryModel,
  BookModel,
  BookStockModel,
  MyBookCollectionModel,
} from "../models/index.js";
import { validateDate, validatePositiveInteger } from "../validator/index.js";
import {
  trimStringValues,
  findAllData,
  findPrimaryKey,
  ResponseError,
} from "../utils/index.js";

const create = async (request, file, req) => {
  return sequelize.transaction(async (t) => {
    if (!file) {
      throw new ResponseError(400, "File image must be filled");
    }

    const ext = path.extname(file?.name).toLowerCase();
    const allowedExtensions = [".png", ".jpg", ".jpeg"];

    if (!allowedExtensions.includes(ext)) {
      throw new ResponseError(
        422,
        "Image files must be PNG, JPG, or JPEG format"
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new ResponseError(
        422,
        "The image file size should be less than 5MB"
      );
    }

    const fileName = `${uuidv4()}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    await file.mv(`./public/images/${fileName}`);

    const { book_tittle, author, publisher, year_published, stock } =
      trimStringValues(request);

    // validateDate(year_published);
    validatePositiveInteger(stock);

    const newBook = await BookModel.create(
      {
        book_tittle,
        author,
        publisher,
        year_published,
        image: fileName,
        url,
      },
      { transaction: t }
    );

    await BookStockModel.create(
      {
        bookId: newBook.id,
        quantity_available: stock,
        quantity_borrowed: 0,
      },
      { transaction: t }
    );

    // await Promise.all(
    //   category.map(async ({ value }) => {
    //     const categoryExists = await BookCategoryModel.findByPk(value);
    //     if (!categoryExists) {
    //       throw new ResponseError(404, `Category with ID ${value} not found`);
    //     }

    //     await BookCategoryAssociation.create(
    //       { bookId: newBook.id, categoryId: value },
    //       { transaction: t }
    //     );
    //   })
    // );

    return {
      id: newBook.id,
      book_tittle,
      author,
      publisher,
      year_published,
      stock,
      image: fileName,
      url,
      // category,
    };
  });
};

const getData = async () => {
  return await findAllData(BookModel, {
    include: [
      {
        model: BookStockModel,
        attributes: ["quantity_available", "quantity_borrowed"],
      },
      {
        model: MyBookCollectionModel,
        attributes: ["userId"],
      },
    ],
  });
};

const getById = async (bookId) => {
  return await findPrimaryKey(BookModel, bookId, {
    include: [
      {
        model: BookStockModel,
        attributes: ["quantity_available", "quantity_borrowed"],
      },
      {
        model: MyBookCollectionModel,
        attributes: ["userId"],
      },
      {
        model: BookCategoryModel,
        attributes: ["id", "category_title"],
        through: { attributes: [] },
      },
    ],
  });
};

const getStatusCollection = async (userId) => {
  const allBooks = await findAllData(BookModel);

  const userCollections = await findAllData(MyBookCollectionModel, {
    where: { userId },
    attributes: ["bookId"],
  });

  const booksStatusCollection = allBooks.map((book) => ({
    bookId: book.id,
    status_collection: userCollections.some(
      (collection) => collection.bookId === book.id
    ),
  }));

  return booksStatusCollection;
};

const update = async (bookId, request) => {
  return sequelize.transaction(async (t) => {
    const book = await findPrimaryKey(BookModel, bookId);

    const { book_tittle, author, publisher, year_published, stock, category } =
      trimStringValues(request);

    validatePositiveInteger(stock);

    await book.update(
      {
        book_tittle,
        author,
        publisher,
        year_published,
      },
      { transaction: t }
    );

    const bookStock = await BookStockModel.findOne({
      where: { bookId },
      transaction: t,
    });

    if (!bookStock) {
      await BookStockModel.create(
        {
          bookId: book.id,
          quantity_available: stock,
          quantity_borrowed: 0,
        },
        { transaction: t }
      );
    } else {
      await bookStock.update(
        {
          quantity_available: stock,
        },
        { transaction: t }
      );
    }

    const currentCategories = await BookCategoryAssociation.findAll({
      where: { bookId },
      attributes: ["categoryId"],
      transaction: t,
    });

    const currentCategoryIds = currentCategories.map((cat) => cat.categoryId);

    const desiredCategoryIds = category.map(({ value }) => value);

    const categoriesToDelete = currentCategoryIds.filter(
      (categoryId) => !desiredCategoryIds.includes(categoryId)
    );
    await BookCategoryAssociation.destroy({
      where: { bookId, categoryId: categoriesToDelete },
      transaction: t,
    });

    const categoriesToAdd = desiredCategoryIds.filter(
      (categoryId) => !currentCategoryIds.includes(categoryId)
    );
    await Promise.all(
      categoriesToAdd.map(async (categoryId) => {
        const categoryExists = await BookCategoryModel.findByPk(categoryId);
        if (!categoryExists) {
          throw new ResponseError(
            404,
            `Category with ID ${categoryId} not found`
          );
        }

        await BookCategoryAssociation.create(
          { bookId, categoryId },
          { transaction: t }
        );
      })
    );
  });
};

const remove = async (bookId) => {
  const book = await findPrimaryKey(BookModel, bookId);
  return await book.destroy();
};

export default {
  create,
  getData,
  getById,
  getStatusCollection,
  update,
  remove,
};
