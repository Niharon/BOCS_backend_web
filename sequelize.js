const { Sequelize } = require('sequelize');

require('dotenv').config({ path: "./config.env" });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    timestamps: true,
    // logging: false,
    define: {
        freezeTableName: true
    }
});


module.exports.sequelize = sequelize;