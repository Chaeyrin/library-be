import { fn, col } from "sequelize";
import sequelize from "../../config/sequelize-connect.js";
import { BookModel, BookReviewModel, UserModel } from "../models/index.js";
import {
  ResponseError,
  trimStringValues,
  findAllData,
  findPrimaryKey,
  findOneData,
} from "../utils/index.js";

const create = async (request) => {
  return sequelize.transaction(async (t) => {
    const { userId, bookId, review_message, rating } =
      trimStringValues(request);

    await findPrimaryKey(UserModel, userId);

    await findPrimaryKey(BookModel, bookId);

    const existingReview = await BookReviewModel.findOne({
      where: { userId, bookId },
      transaction: t,
    });

    if (existingReview) {
      throw new ResponseError(400, "User already has review on this book");
    }

    const reviewRecord = await BookReviewModel.create(
      {
        userId,
        bookId,
        review_message,
        rating,
      },
      { transaction: t }
    );

    return reviewRecord;
  });
};

const get = async () => {
  return await findAllData(BookReviewModel, {
    include: [{ model: UserModel, attributes: ["id", "username"] }],
  });
};

const getAverageRatingByBookId = async (bookId) => {
  const result = await BookReviewModel.findOne({
    attributes: [
      [fn("AVG", col("rating")), "averageRating"],
      [fn("COUNT", col("rating")), "totalReviews"],
    ],
    where: { bookId: bookId },
    raw: true,
  });

  if (!result || result.totalReviews === 0) {
    return { averageRating: 0, totalReviews: 0 };
  }

  return {
    averageRating: parseFloat(result.averageRating.toFixed(2)),
    totalReviews: result.totalReviews,
  };
};

const getByBookId = async (bookId) => {
  return await findAllData(BookReviewModel, {
    where: { bookId: bookId },
    include: [{ model: UserModel, attributes: ["id", "username"] }],
  });
};

const getByUserId = async (bookId, userId) => {
  return await findOneData(BookReviewModel, {
    where: { bookId, userId },
    include: [{ model: UserModel, attributes: ["id", "username"] }],
  });
};

const update = async (reviewId, request) => {
  const review = await findPrimaryKey(BookReviewModel, reviewId);

  const { review_message, rating } = trimStringValues(request);

  return await review.update({
    review_message,
    rating,
  });
};

const remove = async (reviewId) => {
  const review = await findPrimaryKey(BookReviewModel, reviewId);
  return await review.destroy();
};

export default {
  create,
  get,
  getByBookId,
  getByUserId,
  getAverageRatingByBookId,
  update,
  remove,
};
