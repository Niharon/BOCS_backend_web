const Instructors = require("../../models/Instructor.model");


const instructorController = {
    getAllInstructors: async (req, res, next) => {
        try {
            const instructors = await Instructors.findAll({
                attributes: {
                    exclude: ["created_at", "updated_at"],
                },
            });

            res.json({ success: true, message: "Instructors fetched successfully", instructors });

        } catch (error) {
            next(error);
        }
    },
    createInstructor: async (req, res, next) => {
        try {

            const { name, designation } = req.body;
            const photo = req.file.filename;
            const instructor = await Instructors.create({
                name,
                designation,
                photo
            });
            res.json({ success: true, message: "Instructor created successfully", instructor });


        }
        catch (error) {
            next(error);
        }
    },

    getInstructorById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const instructor = await Instructors.findOne({
                where: { id },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            if (instructor) {
                res.json({ success: true, message: "Instructor fetched successfully", instructor });
            } else {
                res.status(400).json({ success: false, message: "Instructor not found" });
            }
        } catch (error) {
            next(error);
        }
    },

    updateInstructor: async (req, res, next) => {

        try {
            const { id } = req.params;

            const instructor = await Instructors.findByPk(id);

            if (!instructor) {
                return res.status(404).json({ error: 'Instructor not found' });
            }

            if (req.file) {
                req.body.photo = req.file.filename;
            }
            // console.log(req.body)
            await instructor.update(req.body);


            const updatedInstructor = await Instructors.findOne({ where: { id } });
            return res
                .status(200)
                .json({ success: true, message: "Instructor updated successfully", instructor: updatedInstructor });


        } catch (error) {
            next(error);
        }
    },
    deleteInstructor: async (req, res, next) => {
        try {
            const { id } = req.params;
            const instructor = await Instructors.findByPk(id);
            if (!instructor) {
                return res.status(404).json({ error: 'Instructor not found' });
            }
            await instructor.destroy();
            return res.status(200).json({ success: true, message: "Instructor deleted successfully" });
        } catch (error) {
            next(error);
        }
    }


};

module.exports = instructorController;