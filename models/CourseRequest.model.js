const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');



const CourseRequest = sequelize.define('courserequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
   
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      
    },
    status:{
        type: DataTypes.ENUM,
        values: ['pending','cancelled','confirmed'],
        defaultValue: 'pending'
    },
    access:{
        type: DataTypes.ENUM,
        values: ['half', 'full','rest'],
    },
    payment_id:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    sender_number:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_status:{
        type: DataTypes.ENUM,
        values: ['pending', 'completed'],
        defaultValue: 'pending'
    },
    payment_method:{
        type: DataTypes.STRING,
      
    },
    payment_amount:{
        type: DataTypes.FLOAT,
    }

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'courserequest'
})

module.exports = CourseRequest;