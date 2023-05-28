import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout'
import { useMutation, useQuery } from '@tanstack/react-query';
import { get } from 'react-hook-form';
import { getInstructorByIdApi, updateInstructorApi } from '../../api/instructorsApi';
import LoadingScreen from '../../components/LoadingScreen';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-hot-toast';
import LoadingButton from '../../components/LoadingButton';

const EditInstructor = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');

  const getInstructorByIdQuery = useQuery(['instructor', id], getInstructorByIdApi);

  const {mutate,isLoading,isError,isSuccess} = useMutation({
    mutationKey: ['instructor', id],
    mutationFn: updateInstructorApi,
    onSuccess:(data)=>{
      toast.success("Instructor Updated Successfully")
    },
    onError:(error)=>{
      console.log(error);
    }
  })

  useEffect(() => {
    if (getInstructorByIdQuery.isSuccess) {
      const fetchedInstructor = getInstructorByIdQuery.data.data.instructor;
      setName(fetchedInstructor.name);
      setDesignation(fetchedInstructor.designation);

    }
  }, [getInstructorByIdQuery.isSuccess]);

  // console.log(getInstructorByIdQuery.data);


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoUrl(URL.createObjectURL(file));
  };

  if (getInstructorByIdQuery.isLoading) {
    return <LoadingScreen />
  }

  const instructor = getInstructorByIdQuery.data.data.instructor;


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create updated data object
    const updatedData = {};
  
    if (name && name !== instructor.name) {
      updatedData.name = name;
    }
  
    if (designation && designation !== instructor.designation) {
      updatedData.designation = designation;
    }
  
    if (photo) {
      updatedData.photo = photo;
    }
  
    // Call the mutation function to update instructor data
    if(!Object.keys(updatedData).length){
      toast.error("Edit some data to update")
    }

    const formData = new FormData();

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key]) {
        formData.append(key, updatedData[key]);
      }
    });
    // console.log(updatedData)

    mutate({id, data: formData});
  };
  return (


    <DefaultLayout>
      <Breadcrumb pageName="Edit Instructor" />

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
                  value={name || instructor.name}
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
             
                  type="file"
                  accept="image/*"

                  onChange={handlePhotoChange}
                />
                 <br />
              {photoUrl ?  (
                <img src={photoUrl} alt="Instructor" style={{ width: '60px',height:'60px' }} />
              )
              :
              (
                <img src={import.meta.env.VITE_BACKEND_URL + instructor.photo} alt="Instructor" style={{ width: '60px',height:'60px' }} />
              )
            
            }

              </div>
             


            
            </div>
            <div className="w-full">
              <label className="mb-2.5 block text-black dark:text-white">
                Desingation

              </label>

              <textarea
                value={designation || instructor.designation}
                onChange={(e) => setDesignation(e.target.value)}

                rows={6}

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </div>


            {
              isLoading
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




  )
}

export default EditInstructor