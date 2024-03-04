import borrowingService from "../services/borrowing-service.js";

export const createBookBorrowing = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await borrowingService.create(request);

    res.status(200).json({
      message: "Apply request successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getDataBook = async (req, res, next) => {
  try {
    const result = await borrowingService.get();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const borrowingId = req.params.id;
    const result = await borrowingService.getById(borrowingId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataBorrowByBookUserId = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;
    const result = await borrowingService.getByBookUser(bookId, userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getBookByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await borrowingService.getByUser(userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const editQuantity = async (req, res, next) => {
  try {
    const borrowingId = req.params.id;
    const request = req.body;
    const result = await borrowingService.edit(borrowingId, request);
    res.status(200).json({
      message: `Book borrowing successfully approved`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const updateApproved = async (req, res, next) => {
  try {
    const borrowingId = req.params.id;
    const result = await borrowingService.approved(borrowingId);
    res.status(200).json({
      message: `Book borrowing successfully approved`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const rejectApproved = async (req, res, next) => {
  try {
    const borrowingId = req.params.id;
    const result = await borrowingService.reject(borrowingId);
    res.status(200).json({
      message: "Rejected successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const returnBook = async (req, res, next) => {
  try {
    const borrowingId = req.params.id;
    const result = await borrowingService.returning(borrowingId);
    res.status(200).json({
      message: "Data updated successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const returnApproved = async (req, res, next) => {
  try {
    const borrowingId = req.params.id;
    const result = await borrowingService.completed(borrowingId);
    res.status(200).json({
      message: "Return successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteBorrowing = async (req, res, next) => {
  try {
    const borrowingId = req.params.id;
    const result = await borrowingService.remove(borrowingId);
    res.status(200).json({
      message: "Deleted successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
