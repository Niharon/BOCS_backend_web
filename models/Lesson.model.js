const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');

const Lessons = sequelize.define('lessons', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
   
    },
    course_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    topic_id:{
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
    tableName: 'lessons'
})

module.exports = Lessons;