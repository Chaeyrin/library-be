import sequelize from "../../config/sequelize-connect.js";
import { DataTypes } from "sequelize";
import { BookModel } from "./index.js";

const BookStockModel = sequelize.define("book_stock", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  quantity_borrowed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default BookStockModel;

BookModel.hasOne(BookStockModel, {
  foreignKey: "bookId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

BookStockModel.belongsTo(BookModel, {
  foreignKey: "bookId",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
