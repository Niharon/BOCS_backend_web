const Courses = require("../../models/Course.model");

const courseController = {
    create: async (req, res, next) => {
        const {title, intro_video, description, price, access_duration} = req.body;
        try {
            const course = await Courses.create({title, intro_video, description, price, access_duration});
            res.status(201).json({message: 'Course created successfully', course});
        } catch (error) {
            res.status(400).json(error);
        }

    },
    update: async (req, res, next) => {
        // update api for course
        const {id} = req.params;
        try {
            const [course] = await Courses.update({...req.body}, {
                where: {
                    id
                }
              
            });
            if(course){
                const updatedCourse = await Courses.findOne({where: {id}});
                return res.status(200).json({message: 'Course updated successfully', course: updatedCourse});
            }
            else{
                return res.status(400).json({message: 'Could not Update Course'});
            }
        } catch (error) {
            res.status(400).json(error);
        }

    },
    delete: async (req, res, next) => {

        const {id} = req.params;
        try {
            const course = await Courses.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({message: 'Course deleted successfully', course});
        } catch (error) {
            res.status(400).json(error);
        }

    }
}

module.exports = courseController;