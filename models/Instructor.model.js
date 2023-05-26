const { DataTypes} = require('sequelize');
const { sequelize } = require('../sequelize');

const Instructors = sequelize.define('instructors', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false

    },
    designation:{
        type: DataTypes.TEXT('long'),
        allowNull:true,
    },
    photo:{
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            const filename = this.getDataValue('photo');
            return filename ? "public/instructors/"+filename : null;
        }
    }

   

},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

// model associations 


module.exports = Instructors;