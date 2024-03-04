import reviewService from "../services/review-service.js";

export const createReview = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await reviewService.create(request);
    res.status(200).json({
      message: "Data created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getDataReview = async (req, res, next) => {
  try {
    const result = await reviewService.get();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataAverageRatingByBookId = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const result = await reviewService.getAverageRatingByBookId(bookId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataReviewByBookId = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const result = await reviewService.getByBookId(bookId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataReviewByUserId = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;
    const result = await reviewService.getByUserId(bookId, userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const request = req.body;
    const result = await reviewService.update(reviewId, request);
    res.status(200).json({
      message: "Data updated successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    await reviewService.remove(reviewId);
    res.status(200).json({
      message: "Deleted succesfully",
    });
  } catch (e) {
    next(e);
  }
};
