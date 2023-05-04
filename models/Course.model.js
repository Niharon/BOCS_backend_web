const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');
const Topics = require('./Topic.model');



const Courses = sequelize.define('Courses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false

    },
    intro_video:{
        type: DataTypes.STRING,
        validator:{
            isUrl: true
        }
    },
    course_thumbnail:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    access_duration:{
        type: DataTypes.INTEGER,
        comment: 'in days',
        defaultValue: 90,
        allowNull: false
    }
   

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Courses'
})

// model associations with topic and lesson


Courses.hasMany(Topics, {
    as: 'topics',
    foreignKey: 'course_id',
    onDelete: 'CASCADE'
});

Topics.belongsTo(Courses);



module.exports = Courses;