import express from "express";
import {
  createBookBorrowing,
  getDataBook,
  getBookById,
  editQuantity,
  updateApproved,
  rejectApproved,
  returnBook,
  returnApproved,
  deleteBorrowing,
  getBookByUserId,
  getDataBorrowByBookUserId,
} from "../../controllers/borrowing-controller.js";
import { verifyToken } from "../../middleware/verify-token.js";

const borrowingRouter = new express.Router();

// borrowingRouter.use(verifyToken);

borrowingRouter.post(`/borrowing`, createBookBorrowing);
borrowingRouter.get(`/borrowing`, getDataBook);
borrowingRouter.get(
  `/borrowing-book/:bookId/:userId`,
  getDataBorrowByBookUserId
);
borrowingRouter.get(`/borrowing/:id`, getBookById);
borrowingRouter.get(`/borrowing-user/:userId`, getBookByUserId);
borrowingRouter.patch(`/borrowing/:id`, editQuantity);
borrowingRouter.patch(`/borrowing-approved/:id`, updateApproved);
borrowingRouter.patch(`/borrowing-rejected/:id`, rejectApproved);
borrowingRouter.patch(`/borrowing-returning/:id`, returnBook);
borrowingRouter.patch(`/borrowing-completed/:id`, returnApproved);
borrowingRouter.delete(`/borrowing/:id`, deleteBorrowing);

export { borrowingRouter };
