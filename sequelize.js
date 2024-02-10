const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    // host: "server22.swiftlyserver.com",
    host: "localhost",
    dialect: "mysql",
    timestamps: true,
    port: process.env.DB_PORT,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
    define: {
      freezeTableName: true,

      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci",
      },
      timestamps: true,
    },
  },

);

module.exports.sequelize = sequelize;
