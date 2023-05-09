const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');

const Quizes = sequelize.define('Quizes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
   
    },
    numOptions:{
        type: DataTypes.INTEGER,
    },
    questionType:{

        type: DataTypes.STRING,
        allowNull: false,
        enum: ['single', 'multiple'],
        defaultValue: 'single'
    },
    options:{
        type: DataTypes.JSON,
        allowNull: false
    },
    course_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lesson_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Quizes'
})




module.exports = Quizes;