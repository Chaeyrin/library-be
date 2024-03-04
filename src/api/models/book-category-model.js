import sequelize from "../../config/sequelize-connect.js";
import { DataTypes } from "sequelize";

const BookCategoryModel = sequelize.define("book_category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  category_description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default BookCategoryModel;
