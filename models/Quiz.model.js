const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');

const Quizes = sequelize.define('quizes', {
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
    },
    correctAnswers:{
        type: DataTypes.JSON,
        allowNull: true
    }
  

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'quizes'
})




module.exports = Quizes;