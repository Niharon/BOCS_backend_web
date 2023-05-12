const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');



const Topics = sequelize.define('topics', {
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
    }
   

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'topics'
})

module.exports = Topics;