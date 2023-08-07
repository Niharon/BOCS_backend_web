const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');
const encryptUrl = require('../utils/encryptUrl');

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
        },
        get() {
            const url = this.getDataValue('video');
            return url ? encryptUrl(url) : null;
        }

    },
    pdf:{
        type: DataTypes.STRING,
        validator:{
            isUrl: true
        },
        get() {
            const filename = this.getDataValue('pdf');
            return filename ? "public/lessons/pdf/" + filename : null;
        }
    },
    description:{
        type: DataTypes.STRING,
    },
    order:{
        type: DataTypes.INTEGER,
    }
  
   

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'lessons'
})

module.exports = Lessons;