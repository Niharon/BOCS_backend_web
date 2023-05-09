const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');
const e = require('express');

const Quizes = sequelize.define('Quizes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question:{
        type: DataTypes.STRING,
   
    },
    type:{
        // type should be single or multiple
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['single', 'multiple'],
        defaultValue: 'single'
    },
    options:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    course_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    topic_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lesson_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    video:{
        type: DataTypes.STRING,
        validator:{
            isUrl: true
        }
    },
    pdf:{
        type: DataTypes.STRING,
        validator:{
            isUrl: true
        }
    },
    description:{
        type: DataTypes.STRING,
    },
  
   

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Quizes'
})

module.exports = Quizes;