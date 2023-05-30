import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CourseRequestTableRow = ({item}) => {
    const {id, user, course, status, payment_status,created_at} = item
    return (
        <tr>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-5">
                <p className="text-black dark:text-white">{user?.name}</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{course?.title}</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{status}</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{new Date(created_at).toLocaleDateString()}</p>
            </td>

            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                    <Link to={`/course-request/edit/${id}`} className="hover:text-[green]">
                        <FaEdit />
                    </Link>
                    <button className="hover:text-danger">
                        <FaTrash/>
                    </button>
                </div>
            </td>
        </tr>

    )
}

export default CourseRequestTableRow