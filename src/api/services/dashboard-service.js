import { Op } from "sequelize";
import BookBorrowingModel from "../models/book-borrowing-model.js";
import BookModel from "../models/book-model.js";
import BookStockModel from "../models/book-stock-model.js";
import MyBookCollectionModel from "../models/my-book-collection-model.js";
import UserModel from "../models/user-model.js";
import { findAllData } from "../utils/index.js";

const getDataBorrowedByMonth = async () => {
  const allData = await findAllData(BookBorrowingModel);

  const chartData = allData.reduce((result, entry) => {
    if (entry.borrowing_date) {
      const monthYear = entry.borrowing_date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      const existingEntry = result.find((item) => item.date === monthYear);

      if (existingEntry) {
        existingEntry["Total borrowed book data"] += entry.quantity_borrowed;
      } else {
        result.push({
          date: monthYear,
          "Total borrowed book data": entry.quantity_borrowed,
        });
      }
    }

    return result;
  }, []);

  const sortedChartData = chartData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  const latestTwoData = sortedChartData.slice(-6);

  return latestTwoData;
};

const getLatestBorrow = async () => {
  return await findAllData(BookBorrowingModel, {
    include: [
      { model: UserModel, attributes: ["username"] },
      { model: BookModel, attributes: ["book_tittle"] },
    ],
    where: {
      borrowing_status: "pending",
    },
    order: [["createdAt", "DESC"]],
    limit: 5,
  });
};

const getCardInfo = async () => {
  const quantityInfo = await findAllData(BookStockModel);

  const totalQuantityAvailable = quantityInfo.reduce(
    (total, entry) => total + entry.quantity_available,
    0
  );

  const totalQuantityBorrowed = quantityInfo.reduce(
    (total, entry) => total + entry.quantity_borrowed,
    0
  );

  const countUsersByRole = async (role) => {
    const users = await UserModel.findAll({
      where: {
        role: role,
      },
    });

    return users.length;
  };

  return {
    totalQuantityAvailable,
    totalQuantityBorrowed,
    userCount: await countUsersByRole("user"),
    officerCount: await countUsersByRole("officer"),
  };
};

/** USER */
const getUserBorrowedByMonth = async (userId) => {
  const allData = await findAllData(BookBorrowingModel, {
    where: { userId },
  });

  const chartData = allData.reduce((result, entry) => {
    if (entry.borrowing_date) {
      const monthYear = entry.borrowing_date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      const existingEntry = result.find((item) => item.date === monthYear);

      if (existingEntry) {
        existingEntry["Total borrowed book data"] += entry.quantity_borrowed;
      } else {
        result.push({
          date: monthYear,
          "Total borrowed book data": entry.quantity_borrowed,
        });
      }
    }

    return result;
  }, []);

  const sortedChartData = chartData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  const latestTwoData = sortedChartData.slice(-6);

  return latestTwoData;
};

const getCardUser = async (userId) => {
  const quantityInfo = await MyBookCollectionModel.findAll({
    where: { userId },
  });

  const totalCollection = quantityInfo.length;

  const countStatusBorrow = async (status) => {
    const result = await BookBorrowingModel.findAll({
      where: { userId, borrowing_status: status },
    });

    return result.length;
  };

  return {
    totalCollection,
    totalPendingBorrowings: await countStatusBorrow("pending"),
    totalBorrowed: await countStatusBorrow("borrowed"),
  };
};

const getLatestBorrowUser = async (userId) => {
  return await findAllData(BookBorrowingModel, {
    include: [
      { model: UserModel, attributes: ["username"] },
      { model: BookModel, attributes: ["book_tittle"] },
    ],
    where: {
      userId: userId,
      [Op.or]: [
        { borrowing_status: "pending" },
        { borrowing_status: "returning" },
      ],
    },
    order: [["updatedAt", "DESC"]],
    limit: 5,
  });
};

export default {
  getDataBorrowedByMonth,
  getUserBorrowedByMonth,
  getLatestBorrowUser,
  getLatestBorrow,
  getCardInfo,
  getCardUser,
};
