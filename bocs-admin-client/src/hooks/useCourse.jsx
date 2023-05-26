import { useContext } from 'react';
import CourseContext from '../context/CourseProvider';

const useCourses = () => {
    return useContext(CourseContext);
}

export default useCourses;