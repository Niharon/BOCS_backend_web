const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Discussion = sequelize.define('discussion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING,

    }

}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'discussion'
})




module.exports = Discussion;