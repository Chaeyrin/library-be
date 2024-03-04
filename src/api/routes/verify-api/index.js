import express from "express";
import { userRouter } from "./user-route.js";
import { bookRouter } from "./book-route.js";
import { borrowingRouter } from "./borrowing-route.js";
import { collectionRouter } from "./collection-route.js";
import { reviewRouter } from "./review-route.js";
import { categoryRouter } from "./category-route.js";
import { dashboardRouter } from "./dashboard-route.js";

const verifyRouter = new express.Router();

verifyRouter.use(userRouter);
verifyRouter.use(bookRouter);
verifyRouter.use(borrowingRouter);
verifyRouter.use(collectionRouter);
verifyRouter.use(reviewRouter);
verifyRouter.use(categoryRouter);
verifyRouter.use(dashboardRouter);

export { verifyRouter };
