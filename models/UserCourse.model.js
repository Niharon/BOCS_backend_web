const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');



const UserCourse = sequelize.define('UserCourse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses',
            key: 'id'
        }
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    progress:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    status:{
        type: DataTypes.ENUM,
        values: ['in-progress', 'completed','expired']
    },
    access:{
        type: DataTypes.ENUM,
        values: ['half', 'full'],
    },
    access_start:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    access_end:{
        type: DataTypes.DATE,
        allowNull: false,
    }
  

   

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'UserCourse'
})

module.exports = UserCourse;