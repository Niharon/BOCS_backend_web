
const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const User = require('./User.model');

const UserNotification = sequelize.define('user_notification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT("medium"),

    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },


}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'user_notification'
})


// associations with user

User.hasMany(UserNotification, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    as: 'notifications'
});
UserNotification.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});



module.exports = UserNotification;