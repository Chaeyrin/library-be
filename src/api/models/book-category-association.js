import sequelize from "../../config/sequelize-connect.js";
import { DataTypes } from "sequelize";
import { BookCategoryModel, BookModel } from "./index.js";

const BookCategoryAssociation = sequelize.define("book_category_association", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

export default BookCategoryAssociation;

BookModel.belongsToMany(BookCategoryModel, {
  through: BookCategoryAssociation,
  foreignKey: "bookId",
});

BookCategoryModel.belongsToMany(BookModel, {
  through: BookCategoryAssociation,
  foreignKey: "categoryId",
});

BookCategoryAssociation.belongsTo(BookModel, {
  foreignKey: "bookId",
});

BookCategoryAssociation.belongsTo(BookCategoryModel, {
  foreignKey: "categoryId",
});
