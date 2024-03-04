import dashboardService from "../services/dashboard-service.js";

export const getDataBorrowedByMonth = async (req, res, next) => {
  try {
    const result = await dashboardService.getDataBorrowedByMonth();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getUserDataBorrowedByMonth = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await dashboardService.getUserBorrowedByMonth(userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataLatestBorrow = async (req, res, next) => {
  try {
    const result = await dashboardService.getLatestBorrow();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataCardInfo = async (req, res, next) => {
  try {
    const result = await dashboardService.getCardInfo();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataCardInfoUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await dashboardService.getCardUser(userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const getDataLatestBorrowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await dashboardService.getLatestBorrowUser(userId);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
