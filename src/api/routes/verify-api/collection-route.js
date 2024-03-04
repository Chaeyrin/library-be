import express from "express";
import {
  createCollection,
  getDataCollectionByUser,
  deleteCollection,
  getDataCollection,
  getDataCollectionById,
} from "../../controllers/collection-controller.js";

const collectionRouter = new express.Router();

collectionRouter.post(`/collection`, createCollection);
collectionRouter.get(`/collection`, getDataCollection);
collectionRouter.get(`/collection/:id`, getDataCollectionById);
collectionRouter.get(`/user-collection/:userId`, getDataCollectionByUser);
// collectionRouter.get("/collection/:userId", getDataCollectionByUser);
collectionRouter.delete(`/collection`, deleteCollection);

export { collectionRouter };
