const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    timestamps: true,
    port: 3306,
    logging: false,
    define: {
        freezeTableName: true
    }
});


module.exports.sequelize = sequelize;