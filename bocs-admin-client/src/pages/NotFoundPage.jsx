import React from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>

        {/* 404 not found page */}
        <div className="h-screen flex flex-col justify-center items-center">

        <h1 className="text-lg">404 Not found</h1>
        <br />
        <Link to="/courses" className="btn py-2 bg-primary text-white  px-3 rounded text-blue-500">Go to All Courses</Link>
        </div>
    </div>
  )
}

export default NotFoundPage