const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');



const User = sequelize.define('users', {
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
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }

    },
    phone: {
        type: DataTypes.STRING,
    
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deviceId: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: 'This device is already registered with another account'
        },
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
    },
    fb: {
        type: DataTypes.STRING,
    },
    google: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user'
    },
    resetPasswordOTP: {
        type: DataTypes.STRING,
        allowNull: true,
    },




}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users'
})

module.exports = User;