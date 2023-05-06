const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "server22.swiftlyserver.com",
    dialect: "mysql",
    timestamps: true,
    port: 3306,
    // logging: false,
    define: {
      freezeTableName: true,

      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci",
      },
      timestamps: true,
    },
  }
);

module.exports.sequelize = sequelize;
