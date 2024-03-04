import sequelize from "../../config/sequelize-connect.js";
import { DataTypes } from "sequelize";
import { UserModel, BookModel } from "./index.js";

const MyBookCollectionModel = sequelize.define("my_book_collections", {
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
});

export default MyBookCollectionModel;

UserModel.hasMany(MyBookCollectionModel);
MyBookCollectionModel.belongsTo(UserModel, { foreignKey: "userId" });

BookModel.hasMany(MyBookCollectionModel);
MyBookCollectionModel.belongsTo(BookModel, { foreignKey: "bookId" });
