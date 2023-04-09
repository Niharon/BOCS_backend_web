const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/db');

const sequelize = db.sequelize;

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    phone:{
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deviceId:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    birthday:{
        type: DataTypes.DATE,
        
    },
    fb:{
        type: DataTypes.STRING,

    },
    google:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user'
    }

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users'
})

module.exports = User;