import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import LoadingButton from '../../components/LoadingButton';
import Input from '../../components/Input';
import { createInstructorApi } from '../../api/instructorsApi';
import { toast } from 'react-hot-toast';

const AddInstructor = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [photo, setPhoto] = useState(null);

  const addInstructorMutation = useMutation({
    mutationKey: 'addInstructor',
    mutationFn: createInstructorApi,
    onSuccess:(data)=>{
      toast.success("Instructor added successfully");
      setName('');
      setDesignation('');
      setPhoto(null);
    },
    onError:(error)=>{
      console.log(error);
      toast.error("Failed to add instructor");
    }
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, designation, photo)
    // Create FormData object to send form data including the photo
    const formData = new FormData();
    formData.append('name', name);
    formData.append('designation', designation);
    formData.append('photo', photo);

    // Call the mutation function to post instructor data
    addInstructorMutation.mutate(formData);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add New Instructor" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full xl:w-1/2">

                <label className="mb-2.5 block text-black dark:text-white">
                  Photo
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  type="file"
                  accept="image/*"
      
                  onChange={(e) => setPhoto(e.target.files[0])}
                />

              </div>


            </div>
            <div className="w-full">
              <label className="mb-2.5 block text-black dark:text-white">
                Desingation

              </label>

              <textarea
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}

                rows={6}

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </div>


            {
              addInstructorMutation.isLoading
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

export default AddInstructor;