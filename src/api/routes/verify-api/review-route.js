import express from "express";
import {
  createReview,
  deleteReview,
  getDataAverageRatingByBookId,
  getDataReview,
  getDataReviewByBookId,
  getDataReviewByUserId,
  updateReview,
} from "../../controllers/review-controller.js";

const reviewRouter = new express.Router();

reviewRouter.post("/review", createReview);
reviewRouter.get("/review", getDataReview);
reviewRouter.get("/review/:bookId", getDataReviewByBookId);
reviewRouter.get("/user-review/:bookId/:userId", getDataReviewByUserId);
reviewRouter.get("/review-rating/:bookId", getDataAverageRatingByBookId);
reviewRouter.patch("/review/:id", updateReview);
reviewRouter.delete("/review/:id", deleteReview);

export { reviewRouter };
