const multer = require("multer");
const path = require("path");

let courseThumbnail;
let instructorPhoto;

// if (process.env.NODE_ENV === 'development') {
courseThumbnail = 'uploads/courses/thumbnail'
instructorPhoto = 'uploads/instructors/'




// multer
const courseThumbnailStorate = multer.diskStorage({
    destination: courseThumbnail,
    filename: function (req, file, cb) {

        const extension = path.extname(file.originalname);

        // slugify the name
        let sluggedName = "course-thumbnail";
        if (req.body.title) {

            sluggedName = req.body.title.split(" ").join("-").toLowerCase();
        }



        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e7);
        cb(null, sluggedName + "-" + uniqueSuffix + extension);
    },
});

const instructorPhotoStorage = multer.diskStorage({
    destination: instructorPhoto,
    filename: function (req, file, cb) {

        const extension = path.extname(file.originalname);

        // slugify the name
        let sluggedName = "instructor";
        if (req.body.name) {

            sluggedName = req.body.name.split(" ").join("-").toLowerCase();
        }



        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e7);
        cb(null, sluggedName + "-" + uniqueSuffix + extension);
    },
});

const courseThumbnailUpload = multer({ storage: courseThumbnailStorate });
const instructorPhotoUpload = multer({ storage: instructorPhotoStorage });

module.exports = {
    courseThumbnailUpload,
    instructorPhotoUpload
}
