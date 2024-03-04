import express from "express";
import bookController from "../../controllers/book-controller.js";
import { verifyToken } from "../../middleware/verify-token.js";

const bookRouter = new express.Router();

// bookRouter.use(verifyToken);

bookRouter.post(`/books`, bookController.createBook);
bookRouter.get(`/books`, bookController.getDataBook);
bookRouter.get(`/books/:id`, bookController.getBookById);
bookRouter.get(
  "/status-collection/:userId",
  bookController.getDataStatusCollection
);
bookRouter.patch(`/books/:id`, bookController.updateBook);
bookRouter.delete(`/books/:id`, bookController.deleteBook);

export { bookRouter };
