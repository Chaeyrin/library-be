import sequelize from "../../config/sequelize-connect.js";
import { DataTypes } from "sequelize";
import { UserModel, BookModel } from "./index.js";

const BookBorrowingModel = sequelize.define("book_borrowing", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity_borrowed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  borrowing_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  borrowing_status: {
    type: DataTypes.ENUM(
      "pending",
      "rejected",
      "borrowed",
      "returning",
      "completed"
    ),
  },
});

export default BookBorrowingModel;

UserModel.hasMany(BookBorrowingModel);
BookBorrowingModel.belongsTo(UserModel, { foreignKey: "userId" });

BookModel.hasMany(BookBorrowingModel);
BookBorrowingModel.belongsTo(BookModel, { foreignKey: "bookId" });
