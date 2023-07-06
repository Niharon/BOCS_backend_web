const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const UserQuizAttempt = sequelize.define('userquizattempt', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lesson_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    course_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userAnswers: {
        type: DataTypes.JSON,
        allowNull: false
    },
    correctQuizes: {
        type: DataTypes.JSON,
        allowNull: false
    },
    marks:{
        type: DataTypes.INTEGER,

    },
    totalMarks:{
        type: DataTypes.INTEGER,
    }

}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'userquizattempt'
})




module.exports = UserQuizAttempt;