import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllCourses } from '../../api/courseApi';
import { createCourseRequestApi } from '../../api/courseRequest';
import { toast } from 'react-hot-toast';

const CreateCourseRequest = () => {
    const [loading,setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [courseId, setCourseId] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [senderNumber, setSenderNumber] = useState('');
    const [transactionNo, setTransactionNo] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [courseAccess, setCourseAccess] = useState('half');
    const [status, setStatus] = useState('pending');

    const { data, isLoading, isSuccess, isError, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: getAllCourses,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        onError: (error) => {
            console.log(error);
        }
    });

    const createCourseRequestMutation = useMutation((data) => createCourseRequestApi(data), {
        

        onSuccess: (data) => {
            console.log(data);
            toast.success("Request Created Successfully");
           
        },
        onError: (error) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
          
        },
        onSettled: () => {
            setLoading(false);
        }
        
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const courseRequestData = {
            email,
            course_id:courseId,
            sender_number:senderNumber,
            payment_id:transactionNo,
            payment_method:paymentMethod,
            payment_amount:amount,
            payment_status: paymentStatus,
            access:courseAccess,
            contact_no:contactNo,
            status


        }
        setLoading(true);
        createCourseRequestMutation.mutate(courseRequestData);

    }
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Create Course Request" />
            <div className='mb-5'>
                <Link to={'/course-request'} className="bg-primary text-white px-3 py-2 text-sm rounded">Go Back</Link>
            </div>

            <div>

                <div className="flex flex-col w-full gap-y-3  md:gap-5 md:flex">
                    <Typography variant="p" fontWeight={"bold"} className="mb-2.5">
                        Reuqested on : {new Date().toDateString()}
                    </Typography>
                    <div className="block md:gap-5 md:flex bg-white p-5 shadow-5">


                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">User Email</label>
                            <input type="email"
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">Select Course</label>

                            <select
                                // defaultValue={status}
                                onChange={(e) => {
                                    setCourseId(e.target.value);
                                }}
                                required

                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-[.7rem] px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                            >
                                <option>Select Course</option>
                                {
                                    isSuccess && data?.data?.courses.map((course) => {
                                        return <option key={course?.id} value={course?.id}>{course.title}</option>
                                    }
                                    )
                                }
                            </select>

                        </div>
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">Contact Number</label>
                            <input type="tel"
                                onChange={(e) => { setContactNo(e.target.value) }}
                                required
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>
                    </div>

                    <div className="block md:gap-5 md:flex bg-white p-5 shadow-5">
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">Sender Number</label>
                            <input type="text"
                                onChange={(e) => { setSenderNumber(e.target.value) }}
                                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">Transaction No.</label>
                            <input type="text"
                                onChange={(e) => { setTransactionNo(e.target.value) }}
                                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">Payment Method</label>
                            <input type="text"
                                onChange={(e) => { setPaymentMethod(e.target.value) }}
                                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>

                    </div>
                    <div className="block md:gap-5 md:flex bg-white p-5 shadow-5">
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">Amount</label>
                            <input type="number"
                                onChange={(e) => { setAmount(Number(e.target.value)) }}
                                min={0}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">Payment Status</label>

                            <select
                                // defaultValue={status}
                                required
                                onChange={(e) => {
                                    setPaymentStatus(e.target.value);
                                }}

                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-[.7rem] px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                            >

                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>

                        </div>
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">Course Access</label>
                            <select
                                // defaultValue={status}
                                required
                                onChange={(e) => {
                                    setCourseAccess(e.target.value);
                                }}

                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-[.7rem] px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                            >

                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                        </div>
                        <div className="mb-2 w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Status
                                <span className="text-meta-1">*</span>
                            </label>
                            <select
                                // defaultValue={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                                required

                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-[.7rem] px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                            >

                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                    </div>

                    <form method='post' onSubmit={handleSubmit}>
                        {
                            loading ? <button className="bg-primary text-white px-3 py-2 text-sm rounded" disabled>Creating...</button> : <button className="bg-primary text-white px-3 py-2 text-sm rounded">Create</button>
                        }
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CreateCourseRequest;