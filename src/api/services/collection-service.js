import sequelize from "../../config/sequelize-connect.js";
import {
  BookModel,
  MyBookCollectionModel,
  UserModel,
} from "../models/index.js";
import {
  trimStringValues,
  ResponseError,
  findAllData,
  findPrimaryKey,
} from "../utils/index.js";

const create = async (request) => {
  return sequelize.transaction(async (t) => {
    const { userId, bookId } = trimStringValues(request);

    await findPrimaryKey(UserModel, userId, { transaction: t });

    await findPrimaryKey(BookModel, bookId, { transaction: t });

    const existingRecord = await MyBookCollectionModel.findOne({
      where: { userId, bookId },
      transaction: t,
    });

    if (existingRecord) {
      throw new ResponseError(
        400,
        "User already has this book in their collection"
      );
    }

    return await MyBookCollectionModel.create(
      {
        userId,
        bookId,
      },
      { transaction: t }
    );
  });
};

const get = async () => {
  return await findAllData(MyBookCollectionModel, {
    include: [
      { model: UserModel, attributes: ["id", "username"] },
      { model: BookModel },
    ],
  });
};

const getById = async (collectionId) => {
  return await findAllData(MyBookCollectionModel, {
    where: { id: collectionId },
    include: [
      { model: UserModel, attributes: ["id", "username", "email"] },
      { model: BookModel, attributes: ["id", "book_tittle", "author"] },
    ],
  });
};

const getByUser = async (userId) => {
  const collection = await findAllData(MyBookCollectionModel, {
    where: { userId },
    include: [
      { model: UserModel, attributes: ["id", "username", "email"] },
      {
        model: BookModel,
        attributes: [
          "id",
          "book_tittle",
          "author",
          "publisher",
          "year_published",
          "image",
          "url",
        ],
      },
    ],
  });

  const user = collection[0].user;
  const booksInfo = collection.map((record) => ({
    bookId: record.bookId,
    ...(record.book && {
      book_title: record.book.book_tittle,
      author: record.book.author,
      publisher: record.book.publisher,
      year_published: record.book.year_published,
      image: record.book.image,
      url: record.book.url,
    }),
  }));

  // const response = {
  //   userId: user.id,
  //   username: user.username,
  //   email: user.email,
  //   book_collection: booksInfo,
  // };

  // return response;

  return booksInfo;
};

const remove = async (request) => {
  const { userId, bookId } = request;

  const findCollection = await MyBookCollectionModel.findOne({
    where: { userId, bookId },
  });

  if (!findCollection) {
    throw new ResponseError(
      404,
      "User doesn't have this book in their collection"
    );
  }

  return await findCollection.destroy();
};

// const remove = async (collectionId) => {
//   const collection = await findPrimaryKey(MyBookCollectionModel, collectionId);
//   return await collection.destroy();
// };

export default { create, remove, get, getById, getByUser };
