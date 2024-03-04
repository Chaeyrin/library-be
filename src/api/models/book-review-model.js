import sequelize from "../../config/sequelize-connect.js";
import { DataTypes } from "sequelize";
import { BookModel, UserModel } from "./index.js";

const BookReviewModel = sequelize.define("book_review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  bookId: {
    type: DataTypes.INTEGER,
  },
  review_message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default BookReviewModel;

UserModel.hasMany(BookReviewModel);
BookReviewModel.belongsTo(UserModel, { foreignKey: "userId" });

BookModel.hasMany(BookReviewModel);
BookReviewModel.belongsTo(BookModel, { foreignKey: "bookId" });
