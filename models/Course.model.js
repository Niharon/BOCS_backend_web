const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const Topics = require('./Topic.model');
const Lessons = require('./Lesson.model');
const Quizes = require('./Quiz.model');
const Instructors = require('./Instructor.model');
const CourseRequest = require('./CourseRequest.model');
const UserCourse = require('./UserCourse.model');
const User = require('./User.model');
const Discussion = require('./Discussion.model');
const DiscussionAnswer = require('./DiscussionAnswer.model');


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
    },
    instructors: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
    }


}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'courses'
})

// model associations with topic and lesson


// course topic, lesson , quizes Associations
// course topic
Courses.hasMany(Topics, {
    as: 'topics',
    foreignKey: 'course_id',
    onDelete: 'CASCADE'
});

Topics.belongsTo(Courses, {
    as: 'course',
    foreignKey: 'course_id'
});

// topic lesson
Topics.hasMany(Lessons, {
    as: 'lessons',
    foreignKey: 'topic_id',
    onDelete: 'CASCADE'
});

Lessons.belongsTo(Topics, {
    as: 'topic',
    foreignKey: 'topic_id'
})

// course lesson
Courses.hasMany(Lessons, {
    as: 'lessons',
    foreignKey: 'course_id',
    onDelete: 'CASCADE'
})
Lessons.belongsTo(Courses, {
    as: 'course',
    foreignKey: 'course_id'
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


// CourseRequest Association

Courses.hasMany(CourseRequest, {

    foreignKey: 'course_id',
    onDelete: 'CASCADE'
})
CourseRequest.belongsTo(Courses, {

    foreignKey: 'course_id'
})

User.hasMany(CourseRequest, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'

});
CourseRequest.belongsTo(User, {
    foreignKey: 'user_id'
});

// UerCourse Association
Courses.hasMany(UserCourse, {

    foreignKey: 'course_id',
    onDelete: 'CASCADE'
})
UserCourse.belongsTo(Courses, {

    foreignKey: 'course_id'
})
User.hasMany(UserCourse, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
UserCourse.belongsTo(User, {
    foreignKey: 'user_id',


});

// Discussion Association
Courses.hasMany(Discussion, {
    as: 'discussions',
    foreignKey: 'course_id',
});
Discussion.belongsTo(Courses, {
    as: 'course',
    foreignKey: 'course_id'
});

// user discussion association
User.hasMany(Discussion, {
    as: 'discussions',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Discussion.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

// user discussion answer association
User.hasMany(DiscussionAnswer, {
    as: 'answers',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
DiscussionAnswer.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});


// discussion answer association
Discussion.hasMany(DiscussionAnswer, {
    as: 'answers',
    foreignKey: 'discussion_id',
    onDelete: 'CASCADE'
});
DiscussionAnswer.belongsTo(Discussion, {
    as: 'discussion',
    foreignKey: 'discussion_id'
});

module.exports = Courses;