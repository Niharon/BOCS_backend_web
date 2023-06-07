const checkCourseExpiry = async (req,res,next)=>{

    const { course_access } = req;
    if(course_access.course.isExpired){
        return res.json({
            success: false,
            message: "Course is expired, You can't access"
        })
    }
    next();


}

module.exports = checkCourseExpiry;