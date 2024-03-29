const multer = require("multer");
const path = require("path");

let courseThumbnail;
let instructorPhoto;

// if (process.env.NODE_ENV === 'development') {
courseThumbnail = 'uploads/courses/thumbnail'
instructorPhoto = 'uploads/instructors/'
lessonPdf = 'uploads/lessons/pdf'
quizeImages = 'uploads/quizes/images'



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

const lessonPdfStorage = multer.diskStorage({
    destination: lessonPdf,
    filename: function (req, file, cb) {

        const extension = path.extname(file.originalname);

        // get the file name and slugify it
        // console.log(file)

        let sluggedName = "lesson-pdf";
        const fileName = file.originalname.split(".pdf")[0];
        if (fileName) {

            sluggedName = fileName.split(" ").join("-").toLowerCase();
        }
        else {
            sluggedName = req.body.title.split(" ").join("-").toLowerCase();
        }

        cb(null, sluggedName + extension);
    },
});


const quizImageStorage = multer.diskStorage({
    destination: quizeImages,
    filename: function (req, file, cb) {
        
        const extension = path.extname(file.originalname);

        // get the file name and slugify it
        // console.log(file)

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E7);

        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});




const courseThumbnailUpload = multer({ storage: courseThumbnailStorate });
const instructorPhotoUpload = multer({ storage: instructorPhotoStorage });
const lessonPdfUpload = multer({ storage: lessonPdfStorage });
const quizImageUpload = multer({ storage: quizImageStorage });

module.exports = {
    courseThumbnailUpload,
    instructorPhotoUpload,
    lessonPdfUpload,
    quizImageUpload
}
