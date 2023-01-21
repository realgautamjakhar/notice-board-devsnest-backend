const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const NoticeBoard = createDB.define("noticeBoard", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  author: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0,
  },
});

module.exports = NoticeBoard;
