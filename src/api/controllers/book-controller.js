import bookService from "../services/book-service.js";

const createBook = async (req, res, next) => {
  try {
    const request = req.body;
    const file = req.files && req.files.image;
    const result = await bookService.create(request, file, req);
    res.status(200).json({
      message: `${request.book_tittle} book data created successfully`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getDataBook = async (req, res, next) => {
  try {
    const result = await bookService.getData();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const result = await bookService.getById(bookId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getDataStatusCollection = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await bookService.getStatusCollection(userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const request = req.body;
    const result = await bookService.update(bookId, request);
    res.status(200).json({
      message: `${request.book_tittle} book updated successfully`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    await bookService.remove(bookId);
    res.status(200).json({
      message: `Book deleted successfully`,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createBook,
  getDataBook,
  getBookById,
  getDataStatusCollection,
  updateBook,
  deleteBook,
};
