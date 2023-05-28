const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const Topics = require('./Topic.model');
const Lessons = require('./Lesson.model');
const Quizes = require('./Quiz.model');
const Instructors = require('./Instructor.model');
const CourseRequest = require('./CourseRequest.model');
const UserCourse = require('./UserCourse.model');


const Courses = sequelize.define('courses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false

    },
    intro_video: {
        type: DataTypes.STRING,
        validator: {
            isUrl: true
        }
    },
    course_thumbnail: {
        type: DataTypes.STRING,
        get() {
            const filename = this.getDataValue('course_thumbnail');
            return filename ? "public/courses/thumbnail/" + filename : null;
        }
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    access_duration: {
        type: DataTypes.INTEGER,
        comment: 'in days',
        defaultValue: 90,
        allowNull: false
    }


}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'courses'
})

// model associations with topic and lesson


Courses.hasMany(Topics, {
    as: 'topics',
    foreignKey: 'course_id',
    onDelete: 'CASCADE'
});

Topics.belongsTo(Courses, {
    as: 'course',
    foreignKey: 'course_id'
});
Topics.hasMany(Lessons, {
    as: 'lessons',
    foreignKey: 'topic_id',
    onDelete: 'CASCADE'
});

Courses.hasMany(Lessons, {
    as: 'lessons',
    foreignKey: 'course_id',
    onDelete: 'CASCADE'
})

Lessons.belongsTo(Courses, {
    as: 'course',
    foreignKey: 'course_id'
})
Lessons.belongsTo(Topics, {
    as: 'topic',
    foreignKey: 'topic_id'
})


// QUIZ LESSON ASSOCIATION
Lessons.hasMany(Quizes, {
    as: 'quizes',
    foreignKey: 'lesson_id',
})

Quizes.belongsTo(Lessons, {
    as: 'lesson',
    foreignKey: 'lesson_id'
})


// Course Request Association

Courses.hasMany(CourseRequest, {

    foreignKey: 'course_id',
    onDelete: 'CASCADE'
})
CourseRequest.belongsTo(Courses, {

    foreignKey: 'course_id'
})

Courses.hasMany(UserCourse,{
 
    foreignKey: 'course_id',
    onDelete: 'CASCADE'
})
UserCourse.belongsTo(Courses,{

    foreignKey: 'course_id'
})

module.exports = Courses;