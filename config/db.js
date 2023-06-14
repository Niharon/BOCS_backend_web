const { sequelize } = require('../sequelize');


const db = {};

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
        await sequelize.sync({ force: false, alter: true});
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Unable to sync the database: ', error);
    }
}


db.connectDb = connectDb;

module.exports =  db ;
