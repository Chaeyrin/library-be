import express from "express";
import {
  getDataBorrowedByMonth,
  getDataCardInfo,
  getDataCardInfoUser,
  getDataLatestBorrow,
  getDataLatestBorrowUser,
  getUserDataBorrowedByMonth,
} from "../../controllers/dashboard-controller.js";

const dashboardRouter = new express.Router();

dashboardRouter.get("/dashboard", getDataBorrowedByMonth);
dashboardRouter.get("/dashboard-user/:userId", getUserDataBorrowedByMonth);
dashboardRouter.get("/dashboard-borrow", getDataLatestBorrow);
dashboardRouter.get("/dashboard-card", getDataCardInfo);
dashboardRouter.get("/dashboard-card-user/:userId", getDataCardInfoUser);
dashboardRouter.get("/dashboard-borrow-user/:userId", getDataLatestBorrowUser);

export { dashboardRouter };
