import sequelize from "../../config/sequelize-connect.js";
import {
  BookBorrowingModel,
  BookModel,
  BookStockModel,
  UserModel,
} from "../models/index.js";
import {
  trimStringValues,
  ResponseError,
  findAllData,
  findPrimaryKey,
  checkStockAvailability,
  findOneExists,
} from "../utils/index.js";
import { validatePositiveInteger } from "../validator/index.js";

const create = async (request) => {
  return sequelize.transaction(async (t) => {
    const { bookId, userId, borrowing_date, return_date, quantity_borrowed } =
      trimStringValues(request);

    validatePositiveInteger(quantity_borrowed);

    await findPrimaryKey(BookModel, bookId);

    const bookStock = await BookStockModel.findOne({
      where: { bookId },
      transaction: t,
    });

    checkStockAvailability(bookStock, quantity_borrowed, false, t);

    /** Create book borrowing record with status "pending" */
    const borrowingRecord = await BookBorrowingModel.create(
      {
        userId,
        bookId,
        quantity_borrowed,
        borrowing_date,
        return_date,
        borrowing_status: "pending",
      },
      { transaction: t }
    );

    return borrowingRecord;
  });
};

const get = async () => {
  return await findAllData(BookBorrowingModel, {
    include: [
      { model: UserModel, attributes: ["username"] },
      { model: BookModel, attributes: ["book_tittle"] },
    ],
  });
};

const getByBookUser = async (bookId, userId) => {
  const data = await BookBorrowingModel.findOne({
    where: { userId, bookId },
    attributes: ["borrowing_status"],
    order: [["createdAt", "DESC"]],
  });

  if (!data) {
    return { borrowing_status: false };
  }

  return data;
};

const getByUser = async (userId) => {
  return await findAllData(BookBorrowingModel, {
    where: { userId },
    include: [
      { model: UserModel, attributes: ["username"] },
      { model: BookModel, attributes: ["book_tittle"] },
    ],
  });
};

const getById = async (borrowingId) => {
  return await findPrimaryKey(BookBorrowingModel, borrowingId, {
    include: [
      { model: UserModel, attributes: ["username"] },
      { model: BookModel, attributes: ["book_tittle"] },
    ],
  });
};

const edit = async (borrowingId, request) => {
  return sequelize.transaction(async (t) => {
    const borrowingRecord = await findPrimaryKey(
      BookBorrowingModel,
      borrowingId,
      { transaction: t }
    );

    const { borrowing_status } = borrowingRecord;

    if (borrowing_status !== "pending") {
      throw new ResponseError(
        400,
        `Cannot edit a borrowing record that is not pending`
      );
    }

    const { quantity_borrowed } = request;

    validatePositiveInteger(quantity_borrowed);

    const { bookId } = borrowingRecord;
    const bookStock = await BookStockModel.findOne({
      where: { bookId },
      transaction: t,
    });

    checkStockAvailability(bookStock, quantity_borrowed, false, t);

    await borrowingRecord.update(
      {
        quantity_borrowed,
      },
      { transaction: t }
    );

    return borrowingRecord;
  });
};

const approved = async (borrowingId) => {
  return sequelize.transaction(async (t) => {
    const borrowingRecord = await findPrimaryKey(
      BookBorrowingModel,
      borrowingId,
      { transaction: t }
    );

    if (borrowingRecord.borrowing_status !== "pending") {
      throw new ResponseError(
        400,
        `Cannot approve a borrowing record that is not pending`
      );
    }

    /** Update borrowing status to "borrowed" */
    await borrowingRecord.update(
      { borrowing_date: new Date(), borrowing_status: "borrowed" },
      { transaction: t }
    );

    /** Update book stock based on quantity_borrowed */
    const { bookId, quantity_borrowed } = borrowingRecord;
    const bookStock = await BookStockModel.findOne({
      where: { bookId },
      transaction: t,
    });

    checkStockAvailability(bookStock, quantity_borrowed, true, t);

    await bookStock.update(
      {
        quantity_available: sequelize.literal(
          `quantity_available - ${quantity_borrowed}`
        ),
        quantity_borrowed: sequelize.literal(
          `quantity_borrowed + ${quantity_borrowed}`
        ),
      },
      { transaction: t }
    );

    return borrowingRecord;
  });
};

const reject = async (borrowingId) => {
  return sequelize.transaction(async (t) => {
    const borrowingRecord = await findPrimaryKey(
      BookBorrowingModel,
      borrowingId,
      { transaction: t }
    );

    if (borrowingRecord.borrowing_status !== "pending") {
      throw new ResponseError(
        400,
        `Cannot reject a borrowing record that is not pending`
      );
    }

    await borrowingRecord.update(
      { borrowing_status: "rejected" },
      { transaction: t }
    );

    return borrowingRecord;
  });
};

const returning = async (borrowingId) => {
  return sequelize.transaction(async (t) => {
    const borrowingRecord = await findPrimaryKey(
      BookBorrowingModel,
      borrowingId,
      { transaction: t }
    );

    if (borrowingRecord.borrowing_status !== "borrowed") {
      throw new ResponseError(
        400,
        `Cannot return a book that is not currently borrowed`
      );
    }

    /** Update borrowing status to "returned" */
    await borrowingRecord.update(
      { return_date: new Date(), borrowing_status: "returning" },
      { transaction: t }
    );

    return borrowingRecord;
  });
};

const completed = async (borrowingId) => {
  return sequelize.transaction(async (t) => {
    const borrowingRecord = await findPrimaryKey(
      BookBorrowingModel,
      borrowingId,
      { transaction: t }
    );

    if (borrowingRecord.borrowing_status !== "returning") {
      throw new ResponseError(
        400,
        `Cannot approve the return for a book that is not returning`
      );
    }

    const { bookId, quantity_borrowed } = borrowingRecord;

    /** Update borrowing status to "finished" */
    await borrowingRecord.update(
      { borrowing_status: "completed" },
      { transaction: t }
    );

    /** Update book stock based on quantity_borrowed */
    const bookStock = await BookStockModel.findOne({
      where: { bookId },
      transaction: t,
    });

    if (!bookStock) {
      throw new ResponseError(500, "Book stock not found");
    }

    await bookStock.update(
      {
        quantity_available: sequelize.literal(
          `quantity_available + ${quantity_borrowed}`
        ),
        quantity_borrowed: sequelize.literal(
          `quantity_borrowed - ${quantity_borrowed}`
        ),
      },
      { transaction: t }
    );

    return borrowingRecord;
  });
};

const remove = async (borrowingId) => {
  return sequelize.transaction(async (t) => {
    const borrowingRecord = await findPrimaryKey(
      BookBorrowingModel,
      borrowingId,
      { transaction: t }
    );

    const deletableStatuses = ["pending", "rejected", "completed"];
    if (!deletableStatuses.includes(borrowingRecord.borrowing_status)) {
      throw new ResponseError(
        400,
        `Cannot delete a borrowing record with status "${borrowingRecord.borrowing_status}"`
      );
    }

    /** Delete the borrowing record */
    return await borrowingRecord.destroy({ transaction: t });
  });
};

export default {
  create,
  get,
  getById,
  getByBookUser,
  getByUser,
  edit,
  approved,
  reject,
  returning,
  completed,
  remove,
};
