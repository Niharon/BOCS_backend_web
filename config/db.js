const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    timestamps: true,
    // logging: false,
    define: {
        freezeTableName: true
    }
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
}

db.syncDb = async () => {
    try {
        await sequelize.sync({ force: false,alter: true});
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Unable to sync the database: ', error);
    }
}

db.sequelize = sequelize;
db.connectDb = connectDb;

module.exports =  db ;
