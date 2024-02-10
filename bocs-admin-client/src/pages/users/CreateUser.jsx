import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import LoadingButton from '../../components/LoadingButton';
import { createUserByAdminApi } from '../../api/userApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';


const CreateUser = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const createUserMutation = useMutation((data) => createUserByAdminApi(data), {
        

        onSuccess: (data) => {
            console.log(data);
            toast.success("User Created Successfully");
            setLoading(false);
            setEmail('');
            setPassword('');
            setName('');
        },
        onError: (error) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
            setLoading(false)
        }
    });


    const handleSubmit = (e) => {
   
        e.preventDefault();
        // console.log(name, designation, photo)
        // // Create FormData object to send form data including the photo
        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('designation', designation);
        // formData.append('photo', photo);
    
        // // Call the mutation function to post instructor data
        // addInstructorMutation.mutate(formData);

        // check if email and password are not empty
        if(email && password){
            setLoading(true)
            createUserMutation.mutate({email,password,name})
            // call the mutation function to create a new user
            // createUserMutation.mutate({email,password,name})
        }
      };
    
    return (
        <DefaultLayout>

            <Breadcrumb pageName="Create New User" />
            <div className='mb-5'>
                <Link to={'/users'} className="bg-primary text-white px-3 py-2 text-sm rounded">Go Back</Link>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <form onSubmit={handleSubmit} method="post">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                    <span className="text-meta-1">*</span>
                                </label>
                                <input

                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                    type="email"
                                    value={email}
                                    autoComplete='off'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Password
                                    <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                    autoComplete='off'
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Name
                                </label>
                                <input
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                    value={name}
                                    autoComplete='off'
                                    type="text"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                       
                           


                        </div>
                   


                        {
                            1==2
                                ?
                                <LoadingButton />
                                :
                                <button
                                    type="submit"
                                    className="m-auto flex w-1/4  justify-center rounded bg-primary p-2 font-medium text-gray"
                                >
                                    Submit
                                </button>
                        }


                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CreateUser;