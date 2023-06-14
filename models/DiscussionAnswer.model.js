const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const DiscussionAnswer = sequelize.define('discussion_answer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'discussion_answer'
})


module.exports = DiscussionAnswer;
