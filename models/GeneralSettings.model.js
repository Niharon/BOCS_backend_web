const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const GeneralSettings = sequelize.define('general_settings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    app_version: {
        type: DataTypes.STRING,
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'general_settings'
})

module.exports = GeneralSettings;

